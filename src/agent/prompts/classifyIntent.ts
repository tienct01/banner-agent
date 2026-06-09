import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import path, { dirname } from "path";
import { loadMarkdownFile } from "../../helpers/index.js";
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
- unknown

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
- unknown

Instructions:
- Analyze the user prompt to determine the best matching banner type and style theme.
- Use the Banner Types Docs and Style Themes Docs to classify both.
- If the user prompt clearly implies a banner type, classify it accordingly.
- If the user prompt does not suggest any style keywords (e.g., "minimal", "bold", "luxury"), or if the style is ambiguous, set styleTheme to "unknown".
- If the user prompt is completely unrelated to banner creation, set both bannerType and styleTheme to "unknown".
- For urgency language ("sale", "limited", "flash sale"), prefer "bold-urgent" theme.
- For holiday/seasonal prompts ("Christmas", "Halloween", "Black Friday"), prefer "seasonal-holiday" theme.
- For luxury/premium brand references, prefer "luxury-elegant" theme.
- For countdown or discount banners with urgency language, pair with "bold-urgent" theme.
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
