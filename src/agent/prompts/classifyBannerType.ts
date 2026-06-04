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

You have access to these tools:

{tools}

Instructions:
Use the Banner Types Docs to analyze user prompts and determine the banner type best relates their prompts. 

Rules:
- If you don't know which banner type to choose, you can ask user using tool you have access.
`);

const UserPromptTemplate = HumanMessagePromptTemplate.fromTemplate(`User prompt: {input}`);

export async function buildBannerTypeClassificationPrompt(userInput: string) {
  const classifyPrompt = await ClassifyPromptTemplate.format({
    bannerTypeDocs: bannerTypeOverviewMd,
    tools: `
- ask_user(): Ask user to get additional information
`
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


