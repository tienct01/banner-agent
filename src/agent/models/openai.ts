import { ChatOpenAI } from "@langchain/openai";

export const openAiModel = new ChatOpenAI({
  model: "gpt-5.2",
  temperature: 0,
});
