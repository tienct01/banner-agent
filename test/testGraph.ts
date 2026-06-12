import { configDotenv } from "dotenv";
import { graph } from "../src/agent.js";
import type { State } from "../src/utils/state.js";

configDotenv();

const userInput =
  process.argv.slice(2).join(" ") ||
  "Create a minimal announcement banner saying Welcome to our store";

const initialState: State = {
  userInput,
  messages: [],
  bannerType: "",
  styleTheme: "",
  configDoc: "",
  styleThemeDoc: "",
  configSchema: {} as State["configSchema"],
  validationErr: undefined,
  generatedResult: {
    config: "",
    isFailed: false,
  },
};

function formatConfig(config: string) {
  try {
    return JSON.stringify(JSON.parse(config), null, 2);
  } catch {
    return config;
  }
}

async function run() {
  console.log(`Input: ${userInput}`);

  const stream = await graph.stream(initialState, {
    recursionLimit: 20,
    streamMode: "updates",
  });

  let finalState: State = { ...initialState };

  for await (const chunk of stream) {
    for (const [nodeName, update] of Object.entries(chunk)) {
      console.log(`[${nodeName}]`);
      finalState = {
        ...finalState,
        ...(update as Partial<State>),
      };
    }
  }

  console.log("\nFinal result:");
  console.log(`bannerType: ${finalState.bannerType}`);
  console.log(`styleTheme: ${finalState.styleTheme}`);
  console.log(`isFailed: ${String(finalState.generatedResult.isFailed)}`);
  console.log("config:");
  console.log(formatConfig(finalState.generatedResult.config));
}

run().catch((error) => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
});
