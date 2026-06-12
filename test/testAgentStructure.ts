import assert from "node:assert/strict";
import { END, START, StateGraph, type GraphNode } from "@langchain/langgraph";
import { BannerAgentState, type State } from "../src/utils/state.js";
import { shouldRetryGenerate } from "../src/utils/nodes.js";

function baseState(overrides: Partial<State> = {}): State {
  return {
    userInput: "Create a minimal announcement banner saying Welcome",
    messages: [],
    bannerType: "announcement-single",
    styleTheme: "minimal",
    configDoc: "",
    styleThemeDoc: "",
    configSchema: {} as State["configSchema"],
    generatedResult: {
      config: "",
      isFailed: false,
    },
    ...overrides,
  };
}

async function testRetryRouter() {
  assert.equal(
    await shouldRetryGenerate(
      baseState({ generatedResult: { isFailed: true } }),
      {} as never,
    ),
    "generate_config",
  );
  assert.equal(
    await shouldRetryGenerate(
      baseState({ generatedResult: { isFailed: false } }),
      {} as never,
    ),
    END,
  );
}

async function testGenerateRetryFlow() {
  let attempt = 0;
  const generateConfigStub: GraphNode<State> = async () => {
    attempt += 1;

    return {
      generatedResult: {
        config: attempt === 1 ? "" : JSON.stringify({ ok: true }),
        isFailed: attempt === 1,
      },
    };
  };

  const graph = new StateGraph(BannerAgentState)
    .addNode("generate_config", generateConfigStub)
    .addEdge(START, "generate_config")
    .addConditionalEdges("generate_config", shouldRetryGenerate, [
      "generate_config",
      END,
    ])
    .compile();

  const steps: string[] = [];
  const stream = await graph.stream(baseState(), {
    recursionLimit: 5,
    streamMode: "updates",
  });

  for await (const chunk of stream) {
    steps.push(...Object.keys(chunk));
  }

  assert.deepEqual(steps, ["generate_config", "generate_config"]);
  assert.equal(attempt, 2);
}

async function run() {
  await testRetryRouter();
  await testGenerateRetryFlow();

  console.log("PASS agent structure");
  console.log("router: failed -> generate_config, success -> END");
  console.log("retry flow: generate_config -> generate_config -> END");
}

run().catch((error) => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
});
