import assert from "node:assert/strict";
import { AIMessage } from "@langchain/core/messages";
import { END, START, StateGraph, type GraphNode } from "@langchain/langgraph";
import z from "zod";
import { BannerAgentState, type State } from "../src/utils/state.js";
import {
  extractGeneratedConfig,
  generateConfigRouter,
} from "../src/utils/nodes.js";

function baseState(overrides: Partial<State> = {}): State {
  return {
    userInput: "Create a minimal announcement banner saying Welcome",
    messages: [],
    bannerType: "announcement-single",
    styleTheme: "minimal",
    configDoc: "",
    styleThemeDoc: "",
    configSchema: z.object({ ok: z.boolean() }),
    validationErr: undefined,
    generatedResult: {
      config: "",
      isFailed: false,
    },
    ...overrides,
  };
}

async function testRetryRouter() {
  assert.equal(
    await generateConfigRouter(
      baseState({ validationErr: "Invalid config" }),
      {} as never,
    ),
    "generate_config",
  );

  assert.equal(
    await generateConfigRouter(
      baseState({
        messages: [
          new AIMessage({
            content: "",
            tool_calls: [
              {
                id: "call_1",
                name: "search_unsplash_images",
                args: { query: "sale banner" },
              },
            ],
          }),
        ],
        validationErr: "stale validation error",
      }),
      {} as never,
    ),
    "generate_config_tools",
  );

  assert.equal(
    await generateConfigRouter(
      baseState({
        messages: [
          new AIMessage("<generated_json>{\"ok\":true}<\/generated_json>"),
        ],
        validationErr: "",
      }),
      {} as never,
    ),
    "extract_configurations",
  );
}

async function testGenerateRetryFlow() {
  let attempt = 0;
  const generateConfigStub: GraphNode<State> = async () => {
    attempt += 1;

    if (attempt === 1) {
      return { validationErr: "Invalid config" };
    }

    return {
      messages: [
        new AIMessage("<generated_json>{\"ok\":true}</generated_json>"),
      ],
      validationErr: "",
    };
  };

  const generateConfigToolsStub: GraphNode<State> = async () => ({});

  const graph = new StateGraph(BannerAgentState)
    .addNode("generate_config", generateConfigStub)
    .addNode("generate_config_tools", generateConfigToolsStub)
    .addNode("extract_configurations", extractGeneratedConfig)
    .addEdge(START, "generate_config")
    .addConditionalEdges("generate_config", generateConfigRouter, [
      "generate_config",
      "generate_config_tools",
      "extract_configurations",
    ])
    .addEdge("generate_config_tools", "generate_config")
    .addEdge("extract_configurations", END)
    .compile();

  const steps: string[] = [];
  let extractedConfig = "";
  const stream = await graph.stream(baseState(), {
    recursionLimit: 5,
    streamMode: "updates",
  });

  for await (const chunk of stream) {
    steps.push(...Object.keys(chunk));

    if ("extract_configurations" in chunk) {
      const generatedResult = chunk.extract_configurations.generatedResult;
      if (generatedResult) {
        extractedConfig = generatedResult.config;
      }
    }
  }

  assert.deepEqual(steps, [
    "generate_config",
    "generate_config",
    "extract_configurations",
  ]);
  assert.equal(attempt, 2);
  assert.equal(extractedConfig, JSON.stringify({ ok: true }));
}

async function run() {
  await testRetryRouter();
  await testGenerateRetryFlow();

  console.log("PASS agent structure");
  console.log(
    "router: validation error -> generate_config, tool call -> generate_config_tools, success -> extract_configurations",
  );
  console.log(
    "retry flow: generate_config -> generate_config -> extract_configurations -> END",
  );
}

run().catch((error) => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
});
