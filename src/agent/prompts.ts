import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { PromptTemplate } from "@langchain/core/prompts";
import { loadMarkdownFile } from "../helpers/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Maps style theme keys to their detail file names (kebab-case, matches directory).
 */
export const STYLE_THEME_FILE_MAP: Record<string, string> = {
  minimal: "minimal",
  "modern-clean": "modern-clean",
  "cyberpunk-futuristic": "cyberpunk-futuristic",
  "vintage-retro": "vintage-retro",
  "playful-fun": "playful-fun",
  "dark-mode": "dark-mode",
  "light-mode": "light-mode",
  "seasonal-holiday": "seasonal-holiday",
  "luxury-elegant": "luxury-elegant",
  "bold-urgent": "bold-urgent",
};

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

// ── Internal types ──────────────────────────────────────────────────────────

interface ParsedBannerType {
  banner_family: string;
  display_name: string;
  description: string;
  use_cases: string[];
}

// ── Banner type parsing ────────────────────────────────────────────────────

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
            useCases.push(item.replace(/^-\s+\*\*.*?\*\*:\s*/, "").trim());
          }
        }
      }

      return {
        banner_family: bannerFamily,
        display_name: heading,
        description,
        use_cases: useCases,
      };
    })
    .filter((b): b is ParsedBannerType => b !== null);
}

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

function buildFamilyList(types: ParsedBannerType[]): string {
  return types.map((t) => t.banner_family).join(", ");
}

// ── Paths ──────────────────────────────────────────────────────────────────

const DOCS_DIR = join(__dirname, "..", "..", "banner_docs");
const BANNER_TYPES_DIR = join(DOCS_DIR, "banner-types");
const STYLE_THEMES_DIR = join(DOCS_DIR, "style-themes");
const CONFIG_DIR = join(DOCS_DIR, "configuration");

// ── Step 1: Banner Type Classification ──────────────────────────────────────

const BANNER_TYPE_OUTPUT_FORMAT = `## Output Format

You MUST respond with ONLY valid JSON. No markdown fences, comments, or text outside the JSON object.

{
  "action": "classify" | "clarify",
  "decision": {
    "banner_family": "<one of: {{FAMILY_LIST}}, or null>",
    "confidence": <float 0.0 to 1.0>,
    "reasoning": "<1-2 sentences explaining why this banner type was chosen>"
  },
  "needs_clarification": <boolean>,
  "clarification_questions": ["<question 1>", "<question 2>"]
}

### When action = "classify":
- You confidently determined the best banner type.
- needs_clarification must be false.
- clarification_questions must be omitted.

### When action = "clarify":
- The user's request is too vague (e.g., "I want a banner" with no details).
- Multiple banner types fit equally well and you cannot decide.
- needs_clarification must be true.
- Provide 1-3 specific, actionable clarification questions.
- Set decision fields to null.`;

const BANNER_TYPE_RULES = `## Rules

1. **One banner type only.** Do not suggest multiple types or combinations.
2. **Prefer the simplest banner type** that fulfills the user's goal. Don't overcomplicate. For example, if the user wants a single discount message, use "discount" — not "multi" with one slide.
3. **Be specific in reasoning.** Instead of "countdown creates urgency", say "Countdown is best because the user wants a flash sale ending in 24 hours" — connect to their actual words.
4. **Clarify when ambiguous.** If you're unsure, ask focused questions about the user's goal rather than guessing.`;

/**
 * Build the system prompt for Step 1 — banner type classification.
 *
 * Reads the banner types overview from `banner-types/README.md` and constructs
 * a prompt that asks the LLM to pick the best banner type or ask for clarification.
 *
 * Use with {@link bannerTypeClassificationUserPrompt} as the user message.
 *
 * @param overviewPath - Optional custom path. Defaults to `banner_docs/banner-types/README.md`.
 */
export async function buildBannerTypeClassificationPrompt(
  overviewPath?: string
): Promise<string> {
  const path = overviewPath ?? join(BANNER_TYPES_DIR, "README.md");
  const overviewMd = await loadMarkdownFile(path);

  const bannerTypes = parseBannerOverview(overviewMd);
  if (bannerTypes.length === 0) {
    throw new Error(
      "No banner types found in README.md. Check the 'Detailed breakdown per type' section."
    );
  }

  const bannerTypesSection = buildBannerTypesSection(bannerTypes);
  const familyList = buildFamilyList(bannerTypes);
  const outputFormat = BANNER_TYPE_OUTPUT_FORMAT.replace("{{FAMILY_LIST}}", familyList);

  return `You are a banner type classifier for an e-commerce platform. Your job is to analyze a shop owner's request and determine which banner type best fulfills their goal.

---

## Available Banner Types

${bannerTypesSection}

---

${outputFormat}

---

${BANNER_TYPE_RULES}`;
}

/** User prompt for Step 1 — banner type classification. */
export const bannerTypeClassificationUserPrompt = PromptTemplate.fromTemplate(
  `Classify the best banner type for this shop owner request:

{user_prompt}`
);

// ── Step 2: Style Theme Classification ─────────────────────────────────────

const STYLE_THEME_OUTPUT_FORMAT = `## Output Format

You MUST respond with ONLY valid JSON. No markdown fences, comments, or text outside the JSON object.

{
  "action": "classify" | "clarify",
  "style": {
    "theme": "<one of the themes above, or null>",
    "theme_description": "<1 sentence describing the visual direction>",
    "confidence": <float 0.0 to 1.0>
  },
  "needs_clarification": <boolean>,
  "clarification_questions": ["<question 1>", "<question 2>"]
}

### When action = "classify":
- You confidently determined the best style theme.
- needs_clarification must be false.
- clarification_questions must be omitted.

### When action = "clarify":
- The user's request contains no style hints and you cannot infer one.
- needs_clarification must be true.
- Provide 1-3 specific, actionable clarification questions about visual preferences.
- Set style fields to null.`;

const STYLE_THEME_RULES = `## Rules

1. **One theme only.** Do not mix themes.
2. **Don't assume style.** If the user didn't describe any visual preference, set theme to null and ask for clarification. Don't default to a theme unless context strongly implies it.
3. **Use inference heuristics:**
   - A countdown or discount paired with urgency language → "bold-urgent".
   - A luxury/premium brand mention → "luxury-elegant".
   - A holiday or season mention → "seasonal-holiday".
   - If the banner type itself is "countdown", the user is likely urgency-driven.
4. **If the user mentions specific colors**, reflect them in the theme_description even when mapping to a general theme.
5. **Be specific in theme_description.** Instead of "using minimal style", say "Clean white background, dark gray text, subtle blue accent for the CTA link."`;

/**
 * Build the system prompt for Step 2 — style theme classification.
 *
 * Reads the style themes overview from `style-themes/README.md` and constructs
 * a prompt that asks the LLM to pick the best visual theme or ask for clarification.
 *
 * Use with {@link styleThemeClassificationUserPrompt} as the user message.
 *
 * @param bannerFamily - The banner_family selected in step 1 (provides context).
 * @param styleThemesPath - Optional custom path. Defaults to `banner_docs/style-themes/README.md`.
 */
export async function buildStyleThemeClassificationPrompt(
  bannerFamily: string,
  styleThemesPath?: string
): Promise<string> {
  const path = styleThemesPath ?? join(STYLE_THEMES_DIR, "README.md");
  const styleThemesMd = await loadMarkdownFile(path);

  const displayName = BANNER_FAMILY_DISPLAY[bannerFamily] ?? bannerFamily;

  return `You are a style theme consultant for banner design. Your job is to recommend the best visual style theme for a banner based on the shop owner's description, brand tone, and campaign context.

The banner type has already been decided: **${displayName}** (banner_family: "${bannerFamily}").

---

${styleThemesMd}

---

${STYLE_THEME_OUTPUT_FORMAT}

---

${STYLE_THEME_RULES}`;
}

/** User prompt for Step 2 — style theme classification. */
export const styleThemeClassificationUserPrompt = PromptTemplate.fromTemplate(
  `Select a visual style theme for this banner:

Banner type: {banner_family}
User request: {user_prompt}`
);

// ── Step 3: Configuration Generation ────────────────────────────────────────

const CONFIG_GENERATION_OUTPUT_FORMAT = `## Output Format

You MUST respond with ONLY a valid JSON object. No markdown fences, no comments, no explanatory text — only the JSON.

Generate the complete banner configuration following the exact structure shown in the example configuration above. Customize:
- **Content fields** (banner_text, act_text, name, coupon_code, etc.) based on the user's request.
- **Visual fields** (bg_color, text colors, fonts, borders, border_radius, btn_style, discount_style, etc.) based on the style theme's color palette, typography, and design guidelines.
- **Keep structural fields** (banner_type, template, close_button, show_device, etc.) as shown in the example unless the user explicitly requests a change.

The output must be a single JSON object that can be parsed by JSON.parse().`;

const CONFIG_GENERATION_RULES = `## Rules

1. **Follow the example structure exactly.** Every field shown in the example must be present.
2. **Apply the style theme consistently.** Use the color palette hex codes, font recommendations, border/radius guidance, and CTA styles from the theme.
3. **Customize content from the user request.** The banner message, CTA text, and coupon codes should reflect what the user asked for.
4. **Don't invent features.** Only use fields that exist in the example. Don't add extra properties.
5. **Use valid values.** Refer to the field constraints (enums, ranges) documented in the fields section.
6. **Keep the banner simple.** Don't enable optional features (like coupons, animations, font scale) unless the user explicitly requests them or the style theme recommends them.
7. **Match the tone.** The banner_text wording should match the style theme's personality (e.g., playful language for playful-fun, professional for modern-clean).`;

/**
 * Build the system prompt for Step 3 — configuration generation.
 *
 * Loads the specific banner configuration doc and the selected style theme detail file,
 * then constructs a prompt asking the LLM to generate a complete banner configuration JSON.
 *
 * Use with {@link configurationGenerationUserPrompt} as the user message.
 *
 * @param bannerFamily - The banner_family key from step 1.
 * @param theme - The style theme key from step 2.
 * @param configPath - Optional custom path to the configuration doc. Defaults to the matching file in `configuration/`.
 * @param styleThemePath - Optional custom path to the style theme detail file. Defaults to the matching file in `style-themes/`.
 */
export async function buildConfigurationGenerationPrompt(
  bannerFamily: string,
  theme: string,
  configPath?: string,
  styleThemePath?: string
): Promise<string> {
  const configFile = BANNER_FAMILY_TO_CONFIG[bannerFamily];
  if (!configFile) {
    throw new Error(`Unknown banner_family: "${bannerFamily}". No configuration file mapped.`);
  }

  const configMdPath = configPath ?? join(CONFIG_DIR, `${configFile}.md`);
  const configMd = await loadMarkdownFile(configMdPath);

  const themeFile = STYLE_THEME_FILE_MAP[theme];
  const themeMdPath = styleThemePath ?? join(STYLE_THEMES_DIR, `${themeFile ?? theme}.md`);
  let themeMd = "";
  try {
    themeMd = await loadMarkdownFile(themeMdPath);
  } catch {
    themeMd = `(Style theme detail file not found at ${themeMdPath}. Apply the "${theme}" theme using your knowledge of its visual characteristics.)`;
  }

  const displayName = BANNER_FAMILY_DISPLAY[bannerFamily] ?? bannerFamily;

  return `You are a banner configuration generator. Your job is to produce a complete, valid JSON configuration object for a **${displayName}** by combining the technical schema with visual design guidelines from the selected style theme.

---

## Banner Configuration Schema: ${displayName}

${configMd}

---

## Style Theme: ${theme}

${themeMd}

---

${CONFIG_GENERATION_OUTPUT_FORMAT}

---

${CONFIG_GENERATION_RULES}`;
}

/** User prompt for Step 3 — configuration generation. */
export const configurationGenerationUserPrompt = PromptTemplate.fromTemplate(
  `Generate a complete banner configuration:

Banner type: {banner_family}
Style theme: {theme}
Theme direction: {theme_description}
User request: {user_prompt}`
);


