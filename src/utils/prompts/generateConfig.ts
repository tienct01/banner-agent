import {
  AIMessagePromptTemplate,
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import type z from "zod";

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

## Output schema 
{schema}

## Instructions
- Output JSON configuration object must be render in marker: 
{generated_json}
{generated_json}
- Generate a complete, valid JSON configuration object that matches the user's request.
- Follow the Configuration Reference Document strictly for field names, types, constraints, and defaults.
- Apply the style guidelines from the Style Theme Reference Document to determine colors, typography, borders, padding, and other visual properties.
- Do NOT include any fields not defined in the Configuration Reference Document.
- Output ONLY the JSON object, no markdown fences, no explanation.
- If the configuration object is failed parse schema, then you need to retry generate.
`);

const GenerateConfigUserTemplate =
  HumanMessagePromptTemplate.fromTemplate(`User request: {userInput}`);

export const buildGenerateConfigPrompt = async (params: {
  userInput: string;
  bannerType: string;
  styleTheme: string;
  configDoc: string;
  styleThemeDoc: string;
  schema: z.ZodType;
}) => {
  const systemPrompt = await GenerateConfigSystemTemplate.format({
    bannerType: params.bannerType,
    styleTheme: params.styleTheme,
    configDoc: params.configDoc,
    styleThemeDoc: params.styleThemeDoc,
    schema: params.schema.toJSONSchema()
  });

  const userPrompt = await GenerateConfigUserTemplate.format({
    userInput: params.userInput,
  });

  const messages = [systemPrompt, userPrompt];

  const chatTemplate = ChatPromptTemplate.fromMessages(messages);
  return await chatTemplate.formatMessages({});
};

