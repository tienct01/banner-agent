import { configDotenv } from "dotenv";
configDotenv();
import { END, START, StateGraph } from "@langchain/langgraph";
import { BannerAgentState } from "./utils/state.js";
import {
  classifyIntent,
  classifyTools,
  shouldAskUser,
  extractIntent,
  generateConfig,
  generateConfigTools,
  extractGeneratedConfig,
  shouldUseGenerateTool,
  shouldRegenerate,
} from "./utils/nodes.js";
import { RedisSaver } from "@langchain/langgraph-checkpoint-redis";
import { redisClient } from "./lib/redis.js";

export const builder = new StateGraph(BannerAgentState)
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
  .addConditionalEdges("generate_config", shouldUseGenerateTool, [
    "generate_config_tools",
    "extract_configurations",
  ])
  .addEdge("generate_config_tools", "generate_config")
  .addConditionalEdges("extract_configurations", shouldRegenerate, [
    "generate_config",
    END,
  ]);

const checkpointer = new RedisSaver(redisClient);

export const graph = builder.compile({ checkpointer });
