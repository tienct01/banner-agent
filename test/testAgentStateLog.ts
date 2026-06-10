import { END, START, StateGraph } from "@langchain/langgraph";
import { BannerAgentState } from "../src/utils/state.js";
import {
  classifyIntent,
  classifyTools,
  shouldAskUser,
  extractIntent,
} from "../src/utils/nodes.js";
import { configDotenv } from "dotenv";
configDotenv();

const graph = new StateGraph(BannerAgentState)
  .addNode("classify_intent", classifyIntent)
  .addNode("ask_user", classifyTools)
  .addNode("extract_intent", extractIntent)
  .addEdge(START, "classify_intent")
  .addConditionalEdges("classify_intent", shouldAskUser, [
    "ask_user",
    "extract_intent",
  ])
  .addEdge("ask_user", "classify_intent")
  .addEdge("extract_intent", END)
  .compile();

const testCases = [
  {
    name: "Clear banner request (no ask_user loop)",
    input: "Create a christmas sale banner with luxury elegant style",
  },
  {
    name: "Countdown with bold style",
    input: "Bold urgent flash sale countdown",
  },
  {
    name: "Unrelated prompt (should trigger ask_user)",
    input: "Book me a flight to Tokyo",
  },
  {
    name: "Ambiguous banner type",
    input: "I want a banner for my store",
  },
];

async function runTest(testCase: (typeof testCases)[number]) {
  const initialState: Record<string, unknown> = {
    userInput: testCase.input,
    messages: [],
    bannerType: "",
    styleTheme: "",
  };

  await graph.stream(initialState, { recursionLimit: 10 });
}

const testCase = testCases[0]

runTest(testCases[3]!)

