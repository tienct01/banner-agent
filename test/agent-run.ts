import assert from "node:assert/strict";
import { HumanMessage } from "@langchain/core/messages";
import { graph } from "../src/agent/agent.js";
import { redisClient } from "../src/agent/lib/redis.js";
import { configDotenv } from "dotenv";
import * as z from "zod";
configDotenv();

const defaultInput =
  "Create a modern clean running banner that says Free shipping on orders over $50.";
const cliInput = process.argv.slice(2).join(" ").trim();
const userInput = process.env.AGENT_TEST_INPUT?.trim() || cliInput || defaultInput;
const shouldAssert = process.env.AGENT_TEST_ASSERT !== "false";
const recursionLimit = Number(process.env.AGENT_TEST_RECURSION_LIMIT ?? 20);

type PrintableMessage = {
  getType: () => string;
  content: unknown;
  tool_calls?: unknown;
};

function parseJsonIfPossible(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function formatMessageContent(content: unknown): unknown {
  if (typeof content === "string") {
    return parseJsonIfPossible(content);
  }

  if (Array.isArray(content)) {
    return content.map((block) => {
      if (
        block &&
        typeof block === "object" &&
        "type" in block &&
        block.type === "text" &&
        "text" in block &&
        typeof block.text === "string"
      ) {
        return parseJsonIfPossible(block.text);
      }

      return formatUnknown(block);
    });
  }

  return formatUnknown(content);
}

function formatMessage(message: PrintableMessage): unknown {
  return {
    type: message.getType(),
    content: formatMessageContent(message.content),
    ...(message.tool_calls ? { toolCalls: formatUnknown(message.tool_calls) } : {}),
  };
}

function formatUnknown(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(formatUnknown);
  }

  if (value && typeof value === "object") {
    if ("getType" in value && "content" in value) {
      return formatMessage(value as PrintableMessage);
    }

    if ("_def" in value) {
      return "[ZodSchema]";
    }

    return Object.fromEntries(
      Object.entries(value).map(([key, entryValue]) => [
        key,
        formatUnknown(entryValue),
      ]),
    );
  }

  return value;
}

function printJson(label: string, value: unknown) {
  console.log(`\n${label}`);
  console.log(JSON.stringify(formatUnknown(value), null, 2));
}

function printFinalConfig(config: string) {
  console.log("\nFinal AI config");
  console.log(JSON.stringify(parseJsonIfPossible(config), null, 2));
}

async function main() {
  console.log(`Running agent test with input: ${userInput}`);

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  const initialState = {
    userInput,
    messages: [new HumanMessage(userInput)],
    bannerType: "",
    styleTheme: "",
    configDoc: "",
    styleThemeDoc: "",
    configSchema: z.any(),
  };

  let step = 0;
  let finalGeneratedResult:
    | { config?: string | undefined; isFailed: boolean }
    | undefined;

  const stream = await graph.stream(initialState, {
    configurable: { thread_id: `agent-run-${Date.now()}` },
    recursionLimit,
    streamMode: "updates",
  });

  for await (const update of stream) {
    step += 1;
    printJson(`Step ${step}`, update);

    if (
      update.extract_configurations &&
      "generatedResult" in update.extract_configurations
    ) {
      finalGeneratedResult = update.extract_configurations.generatedResult;
    }
  }

  if (!shouldAssert) {
    console.log("\nAgent test completed without assertions.");
    return;
  }

  assert.ok(finalGeneratedResult, "Agent did not produce generatedResult.");
  assert.equal(finalGeneratedResult.isFailed, false, "Agent generation failed.");
  assert.ok(finalGeneratedResult.config, "Agent did not produce config JSON.");

  printFinalConfig(finalGeneratedResult.config);

  console.log("\nAgent test passed.");
}

main().catch((error) => {
  console.error("Agent test failed.");
  console.error(error);
  process.exitCode = 1;
}).finally(async () => {
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
});
