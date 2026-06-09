import { tool } from "@langchain/core/tools";
import { z } from "zod";
import * as readline from "readline";
import path from "node:path";
import { loadMarkdownFile } from "../../helpers/index.js";

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

const CONFIG_DOCS_DIR = path.resolve(
  import.meta.dirname,
  "../../../banner_docs/configuration",
);

const askUserSchema = z.object({
  question: z.string().describe("The question to ask the user"),
});

const selectBannerConfigDocSchema = z.object({
  bannerType: z
    .string()
    .describe(
      "The banner type to load the configuration doc for. Must be one of: " +
        Object.keys(BANNER_TYPE_TO_DOC).join(", "),
    ),
});

function promptUser(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`\n[AGENT] ${question}\n> `, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

export const askUserTool = tool(
  async ({ question }) => {
    const answer = await promptUser(question);
    if (!answer) {
      return "User did not provide an answer.";
    }
    return answer;
  },
  {
    name: "ask_user",
    description:
      "Ask the user a question and get their response. Use this when you need clarification or additional information from the user, such as confirming the banner type, collecting missing details, or validating your understanding of the request.",
    schema: askUserSchema,
  },
);

export const selectBannerConfigDoc = tool(
  async ({ bannerType }) => {
    const fileName = BANNER_TYPE_TO_DOC[bannerType];
    if (!fileName) {
      return `Unknown banner type "${bannerType}". Available types: ${Object.keys(BANNER_TYPE_TO_DOC).join(", ")}`;
    }
    const filePath = path.join(CONFIG_DOCS_DIR, fileName);
    const content = await loadMarkdownFile(filePath);
    return content;
  },
  {
    name: "select_banner_configuration_doc",
    description:
      "Load the full configuration reference document for a given banner type. Returns the markdown content including field descriptions, types, defaults, constraints, and example configurations. Available banner types: " +
      Object.keys(BANNER_TYPE_TO_DOC).join(", "),
    schema: selectBannerConfigDocSchema,
  },
);
