import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Mapping from overview.md heading text to banner_family key. */
const HEADING_TO_FAMILY: Record<string, string> = {
  "Announcement Single Banner": "announcement_single",
  "Announcement Rotate Banner": "announcement_rotate",
  "Announcement Running Banner": "announcement_running",
  "Countdown Banner": "countdown",
  "Free Shipping Banner": "free_shipping",
  "Email Signup Banner": "email_signup",
  "Discount Banner": "discount",
  "Multi Banners Slider": "multi",
};

/** Structured banner type parsed from overview.md. */
interface ParsedBannerType {
  banner_family: string;
  display_name: string;
  description: string;
  use_cases: string[];
}

/**
 * Parse the "Detailed breakdown per type" section of banner-types/README.md
 * into an array of structured banner type objects.
 */
function parseBannerOverview(mdContent: string): ParsedBannerType[] {
  const detailedStart = mdContent.indexOf("## Detailed breakdown per type");
  if (detailedStart === -1) return [];

  const detailedContent = mdContent.slice(detailedStart);
  const sections = detailedContent.split(/^### /m).slice(1);

  return sections
    .map((section) => {
      const firstLine = section.split("\n")[0];
      if (!firstLine) return null;
      const heading = firstLine.trim();
      const bannerFamily = HEADING_TO_FAMILY[heading];
      if (!bannerFamily) return null;

      const descStart = section.indexOf("**Description:**");
      const useStart = section.indexOf("**Use cases:**");

      let description = "";
      if (descStart !== -1) {
        const descEnd = useStart !== -1 ? useStart : undefined;
        description = section
          .slice(descStart + "**Description:**".length, descEnd)
          .trim()
          .replace(/\n/g, " ");
      }

      const useCases: string[] = [];
      if (useStart !== -1) {
        const useSection = section.slice(useStart + "**Use cases:**".length);
        const items = useSection.match(/-\s+\*\*.*?\*\*:\s*(.+)/g);
        if (items) {
          for (const item of items) {
            useCases.push(
              item.replace(/^-\s+\*\*.*?\*\*:\s*/, "").trim()
            );
          }
        }
      }

      return { banner_family: bannerFamily, display_name: heading, description, use_cases: useCases };
    })
    .filter((b): b is ParsedBannerType => b !== null);
}

/**
 * Build the "Available Banner Types" markdown section from parsed banner data.
 */
function buildBannerTypesSection(types: ParsedBannerType[]): string {
  return types
    .map((t, i) => {
      let block = `### ${i + 1}. ${t.display_name} (banner_family: "${t.banner_family}")\n`;
      block += `${t.description}\n`;
      if (t.use_cases.length > 0) {
        block += `- **Use cases:**\n`;
        for (const uc of t.use_cases) {
          block += `  - ${uc}\n`;
        }
      }
      return block;
    })
    .join("\n");
}

/**
 * Build the comma-separated list of all banner_family values for the output format spec.
 */
function buildFamilyList(types: ParsedBannerType[]): string {
  return types.map((t) => t.banner_family).join(", ");
}

// ── Shared loader ──────────────────────────────────────────────────────────

/**
 * Load a markdown file using LangChain's TextLoader.
 * Returns the raw file content as a string.
 */
async function loadMarkdownFile(path: string): Promise<string> {
  const loader = new TextLoader(path);
  let docs;
  try {
    docs = await loader.load();
  } catch (err) {
    throw new Error(
      `Failed to load ${path}: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  const doc = docs[0];
  if (!doc) {
    throw new Error(`File is empty: ${path}`);
  }

  return doc.pageContent;
}

// ── Static prompt sections (not derived from files) ────────────────────────

const OUTPUT_FORMAT_TEMPLATE = `## Output Format

You MUST respond with ONLY valid JSON in the following format. Do NOT include markdown fences, comments, or any text outside the JSON object.

{
  "action": "classify" | "clarify",
  "decision": {
    "banner_family": "<one of: {{FAMILY_LIST}}, or null>",
    "confidence": <float 0.0 to 1.0>,
    "reasoning": "<1-2 sentences explaining why this banner type was chosen>"
  },
  "style": {
    "theme": "<one of the 10 themes above, or null>",
    "theme_description": "<1 sentence describing the visual direction>",
    "confidence": <float 0.0 to 1.0>
  },
  "needs_clarification": <boolean>,
  "clarification_questions": ["<question 1>", "<question 2>"]
}

### When to set action = "classify":
- You can confidently determine both the banner type AND style theme.
- needs_clarification must be false.
- clarification_questions must be omitted.

### When to set action = "clarify":
- The user's request is too vague to pick a banner type (e.g., "I want a banner" with no further detail).
- The user's request doesn't mention any style direction and you cannot infer one.
- The user's request could plausibly fit multiple banner types equally well.
- needs_clarification must be true.
- Provide 1-3 specific, actionable clarification questions.
- When action is "clarify", set decision and style fields to null.`;

const RULES_SECTION = `## Important Rules

1. **One banner type, one style theme.** Do not suggest multiple banner types or style mixes.
2. **Prefer the simplest banner type** that fulfills the user's goal. Don't overcomplicate. For example, if the user wants a single discount message, use "discount" — not "multi" with one slide.
3. **Don't assume style.** If the user didn't describe any visual preference, set style.theme to null and ask. Don't default to "modern_clean" unless the context strongly implies it.
4. **For clarification questions**, ask about ONE topic at a time: either banner type OR style, unless both are severely ambiguous. Keep questions concise and actionable.
5. **Be specific in reasoning.** Instead of "countdown creates urgency", say "Countdown is best because the user wants a flash sale ending in 24 hours" — connect to their actual words.`;

// ── Builders ──────────────────────────────────────────────────────────────

const DOCS_DIR = join(__dirname, "..", "..", "banner_docs");

/**
 * Build the complete system prompt by reading banner type descriptions
 * from banner-types/README.md and style themes from style-themes/README.md
 * using LangChain's TextLoader, then combining them with static output/rule sections.
 *
 * @param overviewPath - Optional custom path to the banner types overview.
 *   Defaults to `<project_root>/banner_docs/banner-types/README.md`.
 * @param styleThemesPath - Optional custom path to the style themes overview.
 *   Defaults to `<project_root>/banner_docs/style-themes/README.md`.
 * @returns A promise resolving to the full system prompt string.
 */
export async function buildIntentClassificationSystemPrompt(
  overviewPath?: string,
  styleThemesPath?: string
): Promise<string> {
  const overviewMdPath = overviewPath ?? join(DOCS_DIR, "banner-types", "README.md");
  const styleThemesMdPath = styleThemesPath ?? join(DOCS_DIR, "style-themes", "README.md");

  const [overviewMd, styleThemesMd] = await Promise.all([
    loadMarkdownFile(overviewMdPath),
    loadMarkdownFile(styleThemesMdPath),
  ]);

  const bannerTypes = parseBannerOverview(overviewMd);
  if (bannerTypes.length === 0) {
    throw new Error(
      "No banner types found in overview.md. Check the 'Detailed breakdown per type' section."
    );
  }

  const bannerTypesSection = buildBannerTypesSection(bannerTypes);
  const familyList = buildFamilyList(bannerTypes);
  const outputFormat = OUTPUT_FORMAT_TEMPLATE.replace("{{FAMILY_LIST}}", familyList);

  return `You are a banner design consultant for an e-commerce platform. Your job is to analyze a shop owner's request and determine:

1. **Which banner type** best fulfills their goal (from the available types listed below)
2. **Which visual style theme** is most appropriate based on their description, brand tone, and campaign context

---

## Available Banner Types

${bannerTypesSection}

---

${styleThemesMd}

---

${outputFormat}

---

${RULES_SECTION}`;
}

// ── Static exports ─────────────────────────────────────────────────────────

/**
 * User prompt template with a placeholder for the shop owner's raw request.
 * Usage: replace {user_prompt} with the user's input text.
 */
export const INTENT_CLASSIFICATION_USER_TEMPLATE = `Analyze the following shop owner request and classify the intent for a banner campaign:

{user_prompt}`;

/**
 * Type mapping from banner_family string to the underlying banner_type and template numeric IDs.
 * Used by downstream nodes to select the correct Zod schema for validation.
 */
export const BANNER_FAMILY_MAP: Record<
  string,
  { banner_type: number; template: number }
> = {
  announcement_single: { banner_type: 0, template: 0 },
  announcement_rotate: { banner_type: 1, template: 0 },
  announcement_running: { banner_type: 2, template: 0 },
  countdown: { banner_type: 3, template: 0 },
  free_shipping: { banner_type: 0, template: 3 },
  email_signup: { banner_type: 1, template: 0 },
  discount: { banner_type: 1, template: 0 },
  multi: { banner_type: 3, template: 5 },
};
