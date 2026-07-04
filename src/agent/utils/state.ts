import { StateSchema, MessagesValue } from "@langchain/langgraph";
import * as z from "zod";

export const BannerAgentState = new StateSchema({
  messages: MessagesValue,
  userInput: z.string(),
  clarificationQuestion: z
    .object({
      question: z.string(),
      choices: z.array(z.string()),
    })
    .optional(),
  bannerType: z.string(),
  styleTheme: z.string(),
  configDoc: z.string(),
  styleThemeDoc: z.string(),
  configSchema: z.custom<z.ZodType>(),
  validationErr: z.string().optional(),
  generatedResult: z
    .object({
      config: z.string().optional(),
      isFailed: z.boolean(),
    })
    .default({
      config: "",
      isFailed: false,
    }),
});

export type State = typeof BannerAgentState.State;
export type Update = typeof BannerAgentState.Update;
