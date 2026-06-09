import z from "zod";
import { openAiModel } from "./models/openai.js";
import { askUserTool, selectBannerConfigDoc } from "./tools/index.js";
import type { State } from "./state.js";
import type { ConditionalEdgeRouter, GraphNode } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { buildClassifyIntentPrompt } from "./prompts/classifyIntent.js";

export const classifyTools = new ToolNode([askUserTool]);

export const classifyIntent: GraphNode<State> = async (state) => {
  const classifyPrompt = await buildClassifyIntentPrompt(state.userInput);

  const ClassifyIntentSchema = z.object({
    bannerType: z.enum([
      "announcement-single",
      "announcement-rotate",
      "announcement-running",
      "countdown",
      "discount",
      "email-signup",
      "free-shipping",
      "multi-banner",
      "unknown",
    ]),
    styleTheme: z.enum([
      "minimal",
      "modern-clean",
      "cyberpunk-futuristic",
      "vintage-retro",
      "playful-fun",
      "dark-mode",
      "light-mode",
      "seasonal-holiday",
      "luxury-elegant",
      "bold-urgent",
      "unknown",
    ]),
  });

  const modelWithBannerTypeOutput =
    openAiModel.withStructuredOutput(ClassifyIntentSchema);

  const response = await modelWithBannerTypeOutput.invoke(classifyPrompt);

  return {
    bannerType: response.bannerType,
    styleTheme: response.styleTheme,
  };
};

export const shouldAskUser: ConditionalEdgeRouter<State> = (state) => {
  if (
    !state.bannerType ||
    state.bannerType === "unknown" ||
    !state.styleTheme ||
    state.styleTheme === "unknown"
  ) {
    return "classify_tools";
  }
  return "select_config";
};
