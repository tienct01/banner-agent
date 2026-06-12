import { configDotenv } from "dotenv";
import { graph } from "../src/agent.js";
import type { State } from "../src/utils/state.js";

configDotenv();

const input =
  process.argv.slice(2).join(" ") ||
  "Create a minimal announcement banner saying Welcome to our store";

const initialState: State = {
  userInput: input,
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

function truncate(value: string, maxLength = 500) {
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
}

function formatConfig(config: unknown) {
  if (typeof config !== "string") {
    return JSON.stringify(config, null, 2);
  }

  try {
    return JSON.stringify(JSON.parse(config), null, 2);
  } catch {
    return truncate(config, 1000);
  }
}

function formatValue(key: string, value: unknown) {
  if (key === "configSchema") {
    return "[Zod schema]";
  }

  if (key === "configDoc" || key === "styleThemeDoc") {
    return truncate(String(value), 300);
  }

  if (key === "generatedResult" && value && typeof value === "object") {
    const result = value as State["generatedResult"];
    return [
      `isFailed: ${String(result.isFailed ?? false)}`,
      "config:",
      formatConfig(result.config ?? ""),
    ].join("\n");
  }

  if (key === "messages") {
    return `[${Array.isArray(value) ? value.length : 0} message(s)]`;
  }

  if (typeof value === "string") {
    return truncate(value);
  }

  return JSON.stringify(value, null, 2);
}

function printUpdate(nodeName: string, update: Record<string, unknown>) {
  console.log(`\n[${nodeName}]`);

  for (const [key, value] of Object.entries(update)) {
    console.log(`${key}:`);
    console.log(formatValue(key, value));
  }
}

async function run() {
  console.log(`Input: ${input}`);
  console.log("Workflow updates:");

  let finalState: State = { ...initialState };
  let step = 0;

  const stream = await graph.stream(initialState, {
    recursionLimit: 10,
    streamMode: "updates",
  });

  for await (const chunk of stream) {
    step += 1;
    console.log(`\n--- Step ${step} ---`);

    for (const [nodeName, update] of Object.entries(chunk)) {
      const nodeUpdate = update as Partial<State>;
      printUpdate(nodeName, nodeUpdate as Record<string, unknown>);
      finalState = { ...finalState, ...nodeUpdate };
    }
  }

  console.log("\nFinal output:");
  console.log(`bannerType : ${String(finalState.bannerType ?? "")}`);
  console.log(`styleTheme : ${String(finalState.styleTheme ?? "")}`);
  console.log(`isFailed   : ${String(finalState.generatedResult?.isFailed ?? false)}`);
  console.log("config     :");
  console.log(formatConfig(finalState.generatedResult?.config ?? ""));
}

run().catch((error) => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
});
