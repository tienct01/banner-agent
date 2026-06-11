import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";

const GenerateConfigSystemTemplate = SystemMessagePromptTemplate.fromTemplate(`
You are a Banner Configuration Generator for a Banner Builder App.

Your task is to generate a valid JSON configuration object for a banner based on the user's request, the banner type, the style theme, and the provided reference documents.

## Banner Type
{bannerType}

## Style Theme
{styleTheme}

## Configuration Reference Document
{configDoc}

## Style Theme Reference Document
{styleThemeDoc}

## Instructions
- Generate a complete, valid JSON configuration object that matches the user's request.
- Follow the Configuration Reference Document strictly for field names, types, constraints, and defaults.
- Apply the style guidelines from the Style Theme Reference Document to determine colors, typography, borders, padding, and other visual properties.
- The banner_text and act_text fields must be wrapped in a <p> or <span> tag with inline font-size and color styles.
- Use the exact banner_type value required by the banner type.
- Fill in all required fields. For optional fields where the user did not specify a preference, apply the style theme's guidance or use sensible defaults from the reference doc.
- Do NOT include any fields not defined in the Configuration Reference Document.
- Output ONLY the JSON object, no markdown fences, no explanation.
`);

const RetryConfigSystemTemplate = SystemMessagePromptTemplate.fromTemplate(`
You are repairing a Banner Builder App JSON configuration object.

The previous generated configuration failed JSON parsing or schema validation. Fix only what is necessary so the result is valid JSON and matches the requested banner type schema.

## Banner Type
{bannerType}

## Style Theme
{styleTheme}

## Configuration Reference Document
{configDoc}

## Style Theme Reference Document
{styleThemeDoc}

## Previous Configuration
{previousConfig}

## Parse Or Validation Error
{error}

## Instructions
- Return a complete corrected JSON object.
- Preserve the user's original intent and as much of the previous configuration as possible.
- Follow the Configuration Reference Document strictly for field names, types, constraints, and defaults.
- Apply the Style Theme Reference Document for visual values.
- Do NOT include fields that are not defined in the Configuration Reference Document.
- Output ONLY the JSON object, no markdown fences, no explanation.
`);

const GenerateConfigUserTemplate =
  HumanMessagePromptTemplate.fromTemplate(`User request: {userInput}`);

export const buildGenerateConfigPrompt = async (params: {
  userInput: string;
  bannerType: string;
  styleTheme: string;
  configDoc: string;
  styleThemeDoc: string;
}) => {
  const systemPrompt = await GenerateConfigSystemTemplate.format({
    bannerType: params.bannerType,
    styleTheme: params.styleTheme,
    configDoc: params.configDoc,
    styleThemeDoc: params.styleThemeDoc,
  });

  const userPrompt = await GenerateConfigUserTemplate.format({
    userInput: params.userInput,
  });

  const messages = [systemPrompt, userPrompt];

  const chatTemplate = ChatPromptTemplate.fromMessages(messages);
  return await chatTemplate.formatMessages({});
};

export const buildRetryPrompt = async (params: {
  userInput: string;
  bannerType: string;
  styleTheme: string;
  configDoc: string;
  styleThemeDoc: string;
  previousConfig: string;
  error: unknown;
}) => {
  const systemPrompt = await RetryConfigSystemTemplate.format({
    bannerType: params.bannerType,
    styleTheme: params.styleTheme,
    configDoc: params.configDoc,
    styleThemeDoc: params.styleThemeDoc,
    previousConfig: params.previousConfig,
    error:
      params.error instanceof Error ? params.error.message : String(params.error),
  });

  const userPrompt = await GenerateConfigUserTemplate.format({
    userInput: params.userInput,
  });

  const chatTemplate = ChatPromptTemplate.fromMessages([
    systemPrompt,
    userPrompt,
  ]);
  return await chatTemplate.formatMessages({});
};
