import { toJsonSchema } from "@langchain/core/utils/json_schema";
import { AnnouncementSingleBannerSchema } from "../src/schemas/single_banner.js";
import { AnnouncementRotateBannerSchema } from "../src/schemas/rotate_banner.js";
import { AnnouncementRunningBannerSchema } from "../src/schemas/running_banner.js";
import { AnnouncementCountdownBannerSchema } from "../src/schemas/countdown_banner.js";
import { DiscountBannerSchema } from "../src/schemas/discount_banner.js";
import { EmailSignupBannerSchema } from "../src/schemas/email_signup_banner.js";
import { FreeShippingBannerSchema } from "../src/schemas/free_shipping_banner.js";
import { MultiBannerSchema } from "../src/schemas/multi_banner.js";

const schemas = {
  AnnouncementSingleBannerSchema,
  AnnouncementRotateBannerSchema,
  AnnouncementRunningBannerSchema,
  AnnouncementCountdownBannerSchema,
  DiscountBannerSchema,
  EmailSignupBannerSchema,
  FreeShippingBannerSchema,
  MultiBannerSchema,
};

type Issue = {
  schema: string;
  path: string;
  keys: string[];
  required: string[];
  missing: string[];
};

const issues: Issue[] = [];

function walk(schemaName: string, value: unknown, path: string[] = []) {
  if (!value || typeof value !== "object") return;

  if (
    !Array.isArray(value) &&
    "properties" in value &&
    value.properties &&
    typeof value.properties === "object"
  ) {
    const record = value as {
      properties: Record<string, unknown>;
      required?: unknown;
    };
    const keys = Object.keys(record.properties);
    const required = Array.isArray(record.required)
      ? record.required.map(String)
      : [];
    const missing = keys.filter((key) => !required.includes(key));

    if (missing.length > 0) {
      issues.push({
        schema: schemaName,
        path: path.join(".") || "<root>",
        keys,
        required,
        missing,
      });
    }
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(schemaName, item, path.concat(String(index))));
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    walk(schemaName, child, path.concat(key));
  }
}

for (const [schemaName, zodSchema] of Object.entries(schemas)) {
  walk(schemaName, toJsonSchema(zodSchema));
}

if (issues.length > 0) {
  console.error(JSON.stringify(issues, null, 2));
  throw new Error("Some banner schemas have OpenAI-incompatible optional object properties");
}

console.log("PASS all banner schemas are OpenAI structured-output compatible");
