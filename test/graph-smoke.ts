import assert from "node:assert/strict";
import { END, START } from "@langchain/langgraph";
import { graph } from "../src/agent.js";

const expectedNodes = [
  START,
  END,
  "classify_intent",
  "ask_user",
  "extract_intent",
  "generate_config",
  "generate_config_tools",
  "extract_configurations",
];

const expectedEdges = [
  [START, "classify_intent"],
  ["classify_intent", "ask_user"],
  ["classify_intent", "extract_intent"],
  ["ask_user", "classify_intent"],
  ["extract_intent", "generate_config"],
  ["generate_config", "generate_config_tools"],
  ["generate_config", "extract_configurations"],
  ["generate_config_tools", "generate_config"],
  ["extract_configurations", "generate_config"],
  ["extract_configurations", END],
];

async function main() {
  const drawable = await graph.getGraphAsync({});
  const nodeIds = Object.keys(drawable.nodes);

  for (const nodeId of expectedNodes) {
    assert.ok(nodeIds.includes(nodeId), `Missing graph node: ${nodeId}`);
  }

  for (const [source, target] of expectedEdges) {
    const hasEdge = drawable.edges.some(
      (edge) => edge.source === source && edge.target === target,
    );

    assert.ok(hasEdge, `Missing graph edge: ${source} -> ${target}`);
  }

  console.log(
    `Graph smoke test passed with ${nodeIds.length} nodes and ${drawable.edges.length} edges.`,
  );
}

main().catch((error) => {
  console.error("Graph smoke test failed.");
  console.error(error);
  process.exitCode = 1;
});
