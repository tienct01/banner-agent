import { END, START, StateGraph } from "@langchain/langgraph";
import { BannerAgentState } from "./utils/state.js";
import {
  classifyIntent,
  classifyTools,
  shouldAskUser,
  extractIntent,
  generateConfig,
  generateConfigTools,
  generateConfigRouter,
  extractGeneratedConfig,
} from "./utils/nodes.js";

export const graph = new StateGraph(BannerAgentState)
  .addNode("classify_intent", classifyIntent)
  .addNode("ask_user", classifyTools)
  .addNode("extract_intent", extractIntent)
  .addNode("generate_config", generateConfig)
  .addNode("generate_config_tools", generateConfigTools)
  .addNode("extract_configurations", extractGeneratedConfig)
  .addEdge(START, "classify_intent")
  .addConditionalEdges("classify_intent", shouldAskUser, [
    "ask_user",
    "extract_intent",
  ])
  .addEdge("ask_user", "classify_intent")
  .addEdge("extract_intent", "generate_config")
  .addConditionalEdges("generate_config", generateConfigRouter, [
    "generate_config",
    "generate_config_tools",
    "extract_configurations",
  ])
  .addEdge("generate_config_tools", "generate_config")
  .addEdge("extract_configurations", END)
  .compile();
