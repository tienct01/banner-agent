import { configDotenv } from "dotenv";
import { graph } from "../src/agent.js";

configDotenv();

const input =
  process.argv.slice(2).join(" ") ||
  "Create a minimal announcement banner saying Welcome to our store";

const initialState = {
  userInput: input,
  messages: [],
  bannerType: "",
  styleTheme: "",
  configDoc: "",
  styleThemeDoc: "",
  bannerConfig: "",
  validationError: "",
};

function truncate(value: string, maxLength = 500) {
  return value.length > maxLength ? value.slice(0, maxLength) + "..." : value;
}

function formatValue(key: string, value: unknown) {
  if (key === "configSchema") {
    return "[Zod schema]";
  }

  if (key === "configDoc" || key === "styleThemeDoc") {
    return truncate(String(value), 300);
  }

  if (key === "bannerConfig" && typeof value === "string") {
    try {
      return JSON.stringify(JSON.parse(value), null, 2);
    } catch {
      return truncate(value, 1000);
    }
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

  let finalState: Record<string, unknown> = { ...initialState };
  let step = 0;

  const stream = await graph.stream(initialState, {
    recursionLimit: 10,
    streamMode: "updates",
  });

  for await (const chunk of stream) {
    step += 1;
    console.log(`\n--- Step ${step} ---`);

    for (const [nodeName, update] of Object.entries(chunk)) {
      const nodeUpdate = update as Record<string, unknown>;
      printUpdate(nodeName, nodeUpdate);
      finalState = { ...finalState, ...nodeUpdate };
    }
  }

  console.log("\nFinal output:");
  console.log(`bannerType : ${String(finalState.bannerType ?? "")}`);
  console.log(`styleTheme : ${String(finalState.styleTheme ?? "")}`);
  console.log(`error      : ${String(finalState.validationError ?? "")}`);
  console.log("config     :");
  console.log(formatValue("bannerConfig", finalState.bannerConfig));
}

run().catch((error) => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
});
