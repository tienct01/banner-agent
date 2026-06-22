import { HumanMessage } from "@langchain/core/messages";
import { END, START } from "@langchain/langgraph";
import * as z from "zod";
import { graph } from "../src/agent/agent.js";

type GraphEdge = { source: string; target: string };

const testInput = process.env.TEST_INPUT;

function formatUnknown(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(formatUnknown);
  }

  if (value instanceof HumanMessage) {
    return {
      type: value.getType(),
      content: value.content,
    };
  }

  if (value && typeof value === "object") {
    if ("getType" in value && "content" in value) {
      const message = value as { getType: () => string; content: unknown };
      return {
        type: message.getType(),
        content: message.content,
      };
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

async function printTopology() {
  const drawable = await graph.getGraphAsync({});
  const nodes = Object.keys(drawable.nodes);
  const edges = drawable.edges.map((edge: GraphEdge) => ({
    source: edge.source,
    target: edge.target,
  }));

  printJson("Graph nodes", nodes);
  printJson("Graph edges", edges);
  console.log(
    `\nGraph exported from src/agent.ts has ${nodes.length} nodes and ${edges.length} edges.`,
  );

  if (!nodes.includes(START) || !nodes.includes(END)) {
    throw new Error("Graph topology is missing START or END.");
  }
}

async function printSteps(userInput: string) {
  const initialState = {
    userInput,
    messages: [new HumanMessage(userInput)],
    bannerType: "",
    styleTheme: "",
    configDoc: "",
    styleThemeDoc: "",
    configSchema: z.any(),
  };

  console.log("\nGraph step output");

  let step = 0;
  const stream = await graph.stream(initialState, {
    configurable: { thread_id: `graph-output-${Date.now()}` },
    streamMode: "updates",
  });

  for await (const update of stream) {
    step += 1;
    printJson(`Step ${step}`, update);
  }
}

async function main() {
  await printTopology();

  if (!testInput) {
    console.log(
      "\nSet TEST_INPUT to execute the graph and print streamed step updates.",
    );
    return;
  }

  await printSteps(testInput);
}

main().catch((error) => {
  console.error("Graph output script failed.");
  console.error(error);
  process.exitCode = 1;
});
