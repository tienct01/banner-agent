import assert from "node:assert/strict";
import { END } from "@langchain/langgraph";
import { z } from "zod";
import { openAiModel } from "../src/utils/models.js";
import {
  generateConfig,
  shouldRetryGenerateConfig,
  tryGenerateConfig,
} from "../src/utils/nodes.js";
import type { State } from "../src/utils/state.js";

const TestBannerConfigSchema = z.object({
  banner_type: z.literal(0),
  name: z.string(),
  banner_templates: z
    .array(
      z.object({
        template: z.literal(0),
        banner_text: z.string(),
      }),
    )
    .length(1),
});

const invalidConfig = '{"banner_type":0,"name":';
const repairedConfig = {
  banner_type: 0,
  name: "Fixed banner",
  banner_templates: [
    {
      template: 0,
      banner_text: "<p style=\"font-size:14px;color:#000000\">Hello</p>",
    },
  ],
};

const baseState = {
  userInput: "Create a simple announcement banner saying Hello",
  messages: [],
  bannerType: "announcement-single",
  styleTheme: "minimal",
  configDoc: "Test config doc",
  styleThemeDoc: "Test style doc",
  configSchema: TestBannerConfigSchema,
  bannerConfig: "",
  validationError: "",
} as State;

type TestNode = (state: State) => Promise<Partial<State>>;

const model = openAiModel as unknown as {
  invoke: (input: unknown) => Promise<{ content: string }>;
};

const generateConfigForTest = generateConfig as TestNode;
const tryGenerateConfigForTest = tryGenerateConfig as TestNode;

const originalInvoke = model.invoke;
let invokeCount = 0;
let retryPromptText = "";

function messageInputToText(input: unknown) {
  if (!Array.isArray(input)) {
    return String(input ?? "");
  }

  return input
    .map((message) => {
      if (message && typeof message === "object" && "content" in message) {
        return String((message as { content?: unknown }).content ?? "");
      }

      return String(message ?? "");
    })
    .join("\n");
}

try {
  model.invoke = async (input: unknown) => {
    invokeCount += 1;

    if (invokeCount === 1) {
      return { content: invalidConfig };
    }

    retryPromptText = messageInputToText(input);
    return { content: JSON.stringify(repairedConfig) };
  };

  const firstUpdate = await generateConfigForTest(baseState);

  assert.equal(firstUpdate.bannerConfig, invalidConfig);
  assert.ok(firstUpdate.validationError?.length, "expected parse error");

  const retryRoute = shouldRetryGenerateConfig({
    ...baseState,
    ...firstUpdate,
  } as State);

  assert.equal(retryRoute, "try_generate_config");

  const retryUpdate = await tryGenerateConfigForTest({
    ...baseState,
    ...firstUpdate,
  } as State);

  assert.equal(retryUpdate.validationError, "");
  assert.deepEqual(JSON.parse(retryUpdate.bannerConfig ?? ""), repairedConfig);
  assert.equal(invokeCount, 2);
  assert.ok(retryPromptText.includes(invalidConfig));
  assert.ok(retryPromptText.includes(firstUpdate.validationError ?? ""));

  const finalRoute = shouldRetryGenerateConfig({
    ...baseState,
    ...retryUpdate,
  } as State);

  assert.equal(finalRoute, END);

  console.log("PASS retry generate config path");
} finally {
  model.invoke = originalInvoke;
}
