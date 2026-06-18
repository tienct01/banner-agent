import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";
import { HumanMessage } from "@langchain/core/messages";
import { Command } from "@langchain/langgraph";
import { configDotenv } from "dotenv";
import * as z from "zod";
import { graph } from "./agent.js";
import { redisClient } from "./lib/redis.js";

configDotenv();

const defaultInput =
  "Create a modern clean running banner that says Free shipping on orders over $50.";
const cliInput = process.argv.slice(2).join(" ").trim();
const userInput = process.env.AGENT_TEST_INPUT?.trim() || cliInput || defaultInput;
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

function getInterruptQuestion(payload: unknown): string {
  if (payload && typeof payload === "object" && "question" in payload) {
    const question = payload.question;

    if (typeof question === "string") {
      return question;
    }
  }

  return JSON.stringify(formatUnknown(payload), null, 2);
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

  type GraphInput = Parameters<typeof graph.stream>[0];

  let step = 0;
  let nextInput: GraphInput = initialState;
  const config = {
    configurable: { thread_id: `index-agent-test-${Date.now()}` },
    recursionLimit,
    streamMode: "updates" as const,
    version: "v3" as const,
  };
  const readline = createInterface({ input, output });

  try {
    while (true) {
      const eventStream = await graph.streamEvents(nextInput, config);

      for await (const event of eventStream) {
        step += 1;
        printJson(`Event ${step}`, event);
      }

      if (!eventStream.interrupted) {
        break;
      }

      const interrupt: (typeof eventStream.interrupts)[number] | undefined =
        eventStream.interrupts[0];
      const question: string = interrupt
        ? getInterruptQuestion(interrupt.payload)
        : "The graph requested input.";
      const answer: string = await readline.question(`\n${question}\n> `);
      nextInput = new Command({ resume: answer }) as GraphInput;
    }
  } finally {
    readline.close();
  }

  console.log("\nAgent test completed.");
}

main()
  .catch((error) => {
    console.error("Agent test failed.");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (redisClient.isOpen) {
      await redisClient.quit();
    }
  });
