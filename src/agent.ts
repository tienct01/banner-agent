import { END, START, StateGraph } from "@langchain/langgraph";
import { BannerAgentState } from "./utils/state.js";
import {
  classifyIntent,
  classifyTools,
  shouldAskUser,
  extractIntent,
  generateConfig,
  shouldRetryGenerateConfig,
  tryGenerateConfig,
} from "./utils/nodes.js";

export const graph = new StateGraph(BannerAgentState)
  .addNode("classify_intent", classifyIntent)
  .addNode("ask_user", classifyTools)
  .addNode("extract_intent", extractIntent)
  .addNode("generate_config", generateConfig)
  .addNode("try_generate_config", tryGenerateConfig)
  .addEdge(START, "classify_intent")
  .addConditionalEdges("classify_intent", shouldAskUser, [
    "ask_user",
    "extract_intent",
  ])
  .addEdge("ask_user", "classify_intent")
  .addEdge("extract_intent", "generate_config")
  .addConditionalEdges("generate_config", shouldRetryGenerateConfig, [
    "try_generate_config",
    END,
  ])
  .addEdge("try_generate_config", END)
  .compile();
