import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import path, { dirname } from "path";
import { loadMarkdownFile } from "../helper.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_DIR = path.join(__dirname, "../../../banner_docs/");
const BANNER_TYPES_DIR = path.join(DOCS_DIR, "banner-types");
const STYLE_THEMES_DIR = path.join(DOCS_DIR, "style-themes");

const bannerTypeOverviewMd = await loadMarkdownFile(
  path.join(BANNER_TYPES_DIR, "README.md"),
);

const styleThemeOverviewMd = await loadMarkdownFile(
  path.join(STYLE_THEMES_DIR, "README.md"),
);

const ClassifyPromptTemplate = SystemMessagePromptTemplate.fromTemplate(`
You are an agent for a Banner Builder App. 

Banner types docs:

{bannerTypeDocs}

Banner type enums:
- announcement-single
- announcement-rotate
- announcement-running
- countdown
- discount
- email-signup
- free-shipping
- multi-banner

Style themes docs:

{styleThemeDocs}

Style theme enums:
- minimal
- modern-clean
- cyberpunk-futuristic
- vintage-retro
- playful-fun
- dark-mode
- light-mode
- seasonal-holiday
- luxury-elegant
- bold-urgent
- custom

Instructions:
- Analyze the user prompt to determine the best matching banner type and style theme.
- Use the Banner Types Docs and Style Themes Docs to classify both.
- If the user prompt clearly implies a banner type, classify it accordingly.
- If banner type does not have in list, then you can clarify again
- If the user prompt does not suggest any style keywords (e.g., "minimal", "bold", "luxury"), or if the style is ambiguous, ask the user for clarification using the ask_user tool.
- If the user prompt is completely unrelated to banner creation, ask the user what banner they want using the ask_user tool.

Tool usage guide:
- You have access to the "ask_user" tool to ask the user questions.
- Use ask_user when: the prompt is ambiguous, the banner type cannot be determined, or the style preference is unclear.
- Do NOT use ask_user when: the user prompt is clear enough to classify both banner type and style theme confidently.
- When asking, provide the available options so the user can choose easily.
- Ask just one question each time you ask
`);

const UserPromptTemplate =
  HumanMessagePromptTemplate.fromTemplate(`User prompt: {input}`);

export async function buildClassifyIntentPrompt(userInput: string) {
  const classifyPrompt = await ClassifyPromptTemplate.format({
    bannerTypeDocs: bannerTypeOverviewMd,
    styleThemeDocs: styleThemeOverviewMd,
  });

  const userPrompt = await UserPromptTemplate.format({
    input: userInput,
  });

  const chatTemplate = ChatPromptTemplate.fromMessages([
    classifyPrompt,
    userPrompt,
  ]);

  return await chatTemplate.formatMessages({});
}
