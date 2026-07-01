import z, { ZodError } from "zod";
import { openAiModel } from "./models.js";
import { askUserTool, searchUnsplashImagesTool } from "./tools.js";
import type { State } from "./state.js";
import {
  END,
  type ConditionalEdgeRouter,
  type GraphNode,
} from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { buildClassifyIntentPrompt } from "./prompts/classifyIntent.js";
import { buildGenerateConfigPrompt } from "./prompts/generateConfig.js";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import path from "node:path";
import { extractGeneratedJsonObject, loadMarkdownFile } from "./helper.js";
import { AnnouncementSingleBannerSchema } from "../schemas/single_banner.js";
import { AnnouncementRotateBannerSchema } from "../schemas/rotate_banner.js";
import { AnnouncementRunningBannerSchema } from "../schemas/running_banner.js";
import { AnnouncementCountdownBannerSchema } from "../schemas/countdown_banner.js";
import { DiscountBannerSchema } from "../schemas/discount_banner.js";
import { EmailSignupBannerSchema } from "../schemas/email_signup_banner.js";
import { FreeShippingBannerSchema } from "../schemas/free_shipping_banner.js";
import { MultiBannerSchema } from "../schemas/multi_banner.js";

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

const CONFIG_DOCS_DIR = path.resolve(
  import.meta.dirname,
  "../../banner_docs/configuration",
);

const STYLE_THEMES_DIR = path.resolve(
  import.meta.dirname,
  "../../banner_docs/style-themes",
);

export const classifyIntent: GraphNode<State> = async (state) => {
  const classifyPrompt = await buildClassifyIntentPrompt(state.userInput);
  const response = await openAiModel.bindTools([askUserTool]).invoke([
    ...classifyPrompt,
    ...state.messages,
  ]);

  return {
    messages: [response],
  };
};

export function shouldUseClassifyTool(state: State) {
  const lastMessage = state.messages.at(-1) as AIMessage;

  if (lastMessage?.tool_calls?.length) {
    return "classify_intent_tools";
  }

  return "extract_intent";
}

export const classifyIntentTools = new ToolNode([askUserTool]);

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
  const promptParams = {
    userInput: state.userInput,
    bannerType: state.bannerType ?? "announcement-single",
    styleTheme: state.styleTheme ?? "minimal",
    configDoc: state.configDoc ?? "",
    styleThemeDoc: state.styleThemeDoc ?? "",
    schema: state.configSchema,
  };

  const generateModelWithTool = openAiModel.bindTools([
    searchUnsplashImagesTool,
  ]);
  const prompt = await buildGenerateConfigPrompt(promptParams);
  const response = await generateModelWithTool.invoke([
    ...prompt,
    ...state.messages,
  ]);

  return {
    messages: [response],
  };
};

export const generateConfigTools = new ToolNode([searchUnsplashImagesTool]);

export const shouldUseGenerateTool: ConditionalEdgeRouter<State> = async (
  state,
) => {
  const lastMessage = state.messages.at(-1) as AIMessage;

  if (lastMessage?.tool_calls?.length) {
    return "generate_config_tools";
  }

  return "extract_configurations";
};

export const extractGeneratedConfig: GraphNode<State> = async (state) => {
  try {
    const lastMessage = state.messages.at(-1);

    if(!lastMessage) throw ("Something broken !"); 

    let contentStr = "";
    if (typeof lastMessage.content === "string") {
      contentStr = lastMessage.content;
    } else if (Array.isArray(lastMessage.content)) {
      for (const block of lastMessage.content) {
        if (block.type === "text" && "text" in block) {
          contentStr += block.text + "\n";
        }
      }
    }

    const extractedObj = extractGeneratedJsonObject(contentStr);

    await state.configSchema.parseAsync(extractedObj);

    return {
      validationErr: "",
      generatedResult: {
        config: JSON.stringify(extractedObj),
        isFailed: false,
      },
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        messages: [new HumanMessage(`${z.prettifyError(error)}`)],
        generatedResult: {
          isFailed: true,
        },
      };
    }

    throw error;
  }
};

export const shouldRegenerate: ConditionalEdgeRouter<State> = async (state) => {
  if (state.generatedResult.isFailed) {
    return "generate_config";
  }
  return END;
};
