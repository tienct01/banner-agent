import { StateGraph } from "@langchain/langgraph";
import { BannerAgentState } from "./state.js";
import { classifyIntent } from "./nodes.js";

const workflow = new StateGraph(BannerAgentState);

workflow.addNode("classify_intent", classifyIntent);
