import { toJsonSchema } from "@langchain/core/utils/json_schema";
import { AnnouncementRunningBannerSchema } from "../src/schemas/running_banner.js";

const schema = toJsonSchema(AnnouncementRunningBannerSchema);
const issues: Array<{ path: string; keys: string[]; required: string[]; missing: string[] }> = [];

function walk(value: unknown, path: string[] = []) {
  if (!value || typeof value !== "object") return;

  if (!Array.isArray(value) && "properties" in value && value.properties && typeof value.properties === "object") {
    const record = value as { properties: Record<string, unknown>; required?: unknown };
    const keys = Object.keys(record.properties);
    const required = Array.isArray(record.required) ? record.required.map(String) : [];
    const missing = keys.filter((key) => !required.includes(key));
    if (missing.length) {
      issues.push({ path: path.join(".") || "<root>", keys, required, missing });
    }
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, path.concat(String(index))));
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    walk(child, path.concat(key));
  }
}

walk(schema);
if (issues.length > 0) {
  console.error(JSON.stringify(issues, null, 2));
  throw new Error("AnnouncementRunningBannerSchema has OpenAI-incompatible optional object properties");
}

console.log("PASS running banner schema is OpenAI structured-output compatible");
