import { START, StateGraph } from "@langchain/langgraph";
import { BannerAgentState } from "./state.js";
import { classifyIntent, classifyTools } from "./nodes.js";

const workflow = new StateGraph(BannerAgentState);

workflow.addNode("classify_intent", classifyIntent);
workflow.addNode("classify_tools", classifyTools);

workflow.addEdge(START, '')
