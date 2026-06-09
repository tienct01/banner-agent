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

const bannerTypeOverviewMd = await loadMarkdownFile(
  path.join(BANNER_TYPES_DIR, "README.md"),
);

const ClassifyPromptTemplate = SystemMessagePromptTemplate.fromTemplate(`
You are an agent for a Banner Builder App. 

Here is the Banner Types Docs:

{bannerTypeDocs}

BannerType enums:
- announcement-single
- announcement-rotate
- announcement-running
- countdown
- discount
- email-signup
- free-shipping
- multi-banner

Instructions:
- Use the Banner Types Docs to analyze user prompts and determine the banner type best relates their prompts. 
- If don't know which banner type to select then return don't know

`);

const UserPromptTemplate = HumanMessagePromptTemplate.fromTemplate(`User prompt: {input}`);

export async function buildBannerTypeClassificationPrompt(userInput: string) {
  const classifyPrompt = await ClassifyPromptTemplate.format({
    bannerTypeDocs: bannerTypeOverviewMd,
  });

  const userPrompt = await UserPromptTemplate.format({
    input: userInput
  });

  const chatTemplate = ChatPromptTemplate.fromMessages([
    classifyPrompt,
    userPrompt
  ]);

  return await chatTemplate.formatMessages({});
}


