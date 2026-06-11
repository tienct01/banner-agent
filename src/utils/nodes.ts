import z from "zod";
import { openAiModel } from "./models.js";
import { askUserTool } from "./tools.js";
import type { State } from "./state.js";
import { END, type GraphNode } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { buildClassifyIntentPrompt } from "./prompts/classifyIntent.js";
import {
  buildGenerateConfigPrompt,
  buildRetryPrompt,
} from "./prompts/generateConfig.js";
import { AIMessage } from "@langchain/core/messages";
import path from "node:path";
import { loadMarkdownFile } from "./helper.js";
import { AnnouncementSingleBannerSchema } from "src/schemas/single_banner.js";
import { AnnouncementRotateBannerSchema } from "src/schemas/rotate_banner.js";
import { AnnouncementRunningBannerSchema } from "src/schemas/running_banner.js";
import { AnnouncementCountdownBannerSchema } from "src/schemas/countdown_banner.js";
import { DiscountBannerSchema } from "src/schemas/discount_banner.js";
import { EmailSignupBannerSchema } from "src/schemas/email_signup_banner.js";
import { FreeShippingBannerSchema } from "src/schemas/free_shipping_banner.js";
import { MultiBannerSchema } from "src/schemas/multi_banner.js";

const BANNER_TYPE_TO_DOC: Record<string, string> = {
  "announcement-single": "announcement-single.md",
  "announcement-rotate": "announcement-rotate.md",
  "announcement-running": "announcement-running.md",
  countdown: "countdown.md",
  discount: "discount.md",
  "email-signup": "email-signup.md",
  "free-shipping": "free-shipping.md",
  "multi-banner": "multi-banner-slider.md",
};

const STYLE_THEME_TO_DOC: Record<string, string> = {
  minimal: "minimal.md",
  "modern-clean": "modern-clean.md",
  "cyberpunk-futuristic": "cyberpunk-futuristic.md",
  "vintage-retro": "vintage-retro.md",
  "playful-fun": "playful-fun.md",
  "dark-mode": "dark-mode.md",
  "light-mode": "light-mode.md",
  "seasonal-holiday": "seasonal-holiday.md",
  "luxury-elegant": "luxury-elegant.md",
  "bold-urgent": "bold-urgent.md",
};

const CONFIG_SCHEMA_MAP: Record<string, z.ZodType> = {
  "announcement-single": AnnouncementSingleBannerSchema,
  "announcement-rotate": AnnouncementRotateBannerSchema,
  "announcement-running": AnnouncementRunningBannerSchema,
  countdown: AnnouncementCountdownBannerSchema,
  discount: DiscountBannerSchema,
  "email-signup": EmailSignupBannerSchema,
  "free-shipping": FreeShippingBannerSchema,
  "multi-banner": MultiBannerSchema,
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function messageContentToString(content: unknown) {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }

        if (part && typeof part === "object" && "text" in part) {
          return String((part as { text?: unknown }).text ?? "");
        }

        return JSON.stringify(part);
      })
      .join("");
  }

  return String(content ?? "");
}

function parseJsonConfig(configText: string, schema: z.ZodType) {
  const trimmed = configText.trim();
  const fencedMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  const jsonText = fencedMatch?.[1] ?? trimmed;

  return schema.parse(JSON.parse(jsonText));
}

const CONFIG_DOCS_DIR = path.resolve(
  import.meta.dirname,
  "../../banner_docs/configuration",
);

const STYLE_THEMES_DIR = path.resolve(
  import.meta.dirname,
  "../../banner_docs/style-themes",
);

const modelWithTools = openAiModel.bindTools([askUserTool]);

export const classifyTools = new ToolNode([askUserTool]);

export const classifyIntent: GraphNode<State> = async (state) => {
  const classifyPrompt = await buildClassifyIntentPrompt(state.userInput);
  const response = await modelWithTools.invoke([
    ...classifyPrompt,
    ...state.messages,
  ]);

  return {
    messages: [response],
  };
};

export function shouldAskUser(state: State) {
  const lastMessage = state.messages[state.messages.length - 1];
  if (
    lastMessage instanceof AIMessage &&
    lastMessage.tool_calls &&
    lastMessage.tool_calls.length > 0
  ) {
    return "ask_user";
  }
  return "extract_intent";
}

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

const modelWithStructuredOutput =
  openAiModel.withStructuredOutput(ClassifyIntentSchema);

export const extractIntent: GraphNode<State> = async (state) => {
  const classifyPrompt = await buildClassifyIntentPrompt(state.userInput);
  const response = await modelWithStructuredOutput.invoke([
    ...classifyPrompt,
    ...state.messages,
  ]);

  const configFileName = BANNER_TYPE_TO_DOC[response.bannerType];
  const styleFileName = STYLE_THEME_TO_DOC[response.styleTheme ?? "minimal"];

  const [configDoc, styleThemeDoc] = await Promise.all([
    configFileName
      ? loadMarkdownFile(path.join(CONFIG_DOCS_DIR, configFileName))
      : Promise.resolve(
        `Unknown banner type "${response.bannerType}". Available types: ${Object.keys(BANNER_TYPE_TO_DOC).join(", ")}`,
      ),
    styleFileName
      ? loadMarkdownFile(path.join(STYLE_THEMES_DIR, styleFileName))
      : Promise.resolve(
        `Unknown style theme "${response.styleTheme}". Available themes: ${Object.keys(STYLE_THEME_TO_DOC).join(", ")}`,
      ),
  ]);

  const configSchema =
    CONFIG_SCHEMA_MAP[response.bannerType] ?? AnnouncementSingleBannerSchema;

  return {
    bannerType: response.bannerType,
    styleTheme: response.styleTheme,
    configDoc,
    styleThemeDoc,
    configSchema,
  };
};

export const generateConfig: GraphNode<State> = async (state) => {
  const schema = state.configSchema;
  const promptParams = {
    userInput: state.userInput,
    bannerType: state.bannerType ?? "announcement-single",
    styleTheme: state.styleTheme ?? "minimal",
    configDoc: state.configDoc ?? "",
    styleThemeDoc: state.styleThemeDoc ?? "",
  };

  try {
    const prompt = await buildGenerateConfigPrompt(promptParams);
    const response = await openAiModel.invoke(prompt);
    const previousConfig = messageContentToString(response.content);

    try {
      const config = parseJsonConfig(previousConfig, schema);
      return { bannerConfig: JSON.stringify(config), validationError: "" };
    } catch (parseError) {
      return {
        bannerConfig: previousConfig,
        validationError: getErrorMessage(parseError),
      };
    }
  } catch (error) {
    return { validationError: getErrorMessage(error) };
  }
};

export function shouldRetryGenerateConfig(state: State) {
  return state.validationError && state.bannerConfig
    ? "try_generate_config"
    : END;
}

export const tryGenerateConfig: GraphNode<State> = async (state) => {
  const schema = state.configSchema;
  const previousConfig = state.bannerConfig ?? "";

  try {
    const retryPrompt = await buildRetryPrompt({
      userInput: state.userInput,
      bannerType: state.bannerType ?? "announcement-single",
      styleTheme: state.styleTheme ?? "minimal",
      configDoc: state.configDoc ?? "",
      styleThemeDoc: state.styleThemeDoc ?? "",
      previousConfig,
      error: state.validationError ?? "",
    });
    const retryResponse = await openAiModel.invoke(retryPrompt);
    const retryConfig = messageContentToString(retryResponse.content);
    const config = parseJsonConfig(retryConfig, schema);

    return { bannerConfig: JSON.stringify(config), validationError: "" };
  } catch (error) {
    return { validationError: getErrorMessage(error) };
  }
};
