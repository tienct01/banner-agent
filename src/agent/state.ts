import { StateSchema, MessagesValue } from "@langchain/langgraph";
import * as z from "zod";

export const BannerAgentState = new StateSchema({
  userInput: z.string(),
  messages: MessagesValue,
  bannerType: z.string(),
});

export type State = typeof BannerAgentState.State;
export type Update = typeof BannerAgentState.Update;
