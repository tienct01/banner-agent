import { writeFileSync } from "node:fs";
import { buildBannerTypeClassificationPrompt } from "../src/agent/prompts/classifyBannerType.js";

const result = await buildBannerTypeClassificationPrompt("Create a christmas sale banner");
const content = result[0]?.content;

if (content) {
  writeFileSync("test/result.md", String(content), "utf-8");
  console.log("Written to test/result.md");
}
