import { END, START, StateGraph } from "@langchain/langgraph";
import { BannerAgentState, initialState } from "../src/utils/state.js";
import { classifyIntent, extractIntent } from "../src/utils/nodes.js";
import { configDotenv } from "dotenv";
configDotenv();

const testGraph = new StateGraph(BannerAgentState)
  .addNode("classify_intent", classifyIntent)
  .addNode("extract_intent", extractIntent)
  .addEdge(START, "classify_intent")
  .addEdge("classify_intent", "extract_intent")
  .addEdge("extract_intent", END)
  .compile();

const testCases = [
  { input: "Create a christmas sale banner", expectedBannerType: "discount", expectedStyleTheme: "seasonal-holiday" },
  { input: "Show a countdown timer for New Year's Eve", expectedBannerType: "countdown", expectedStyleTheme: "seasonal-holiday" },
  { input: "A single announcement bar for free shipping", expectedBannerType: "free-shipping", expectedStyleTheme: "unknown" },
  { input: "Luxury premium black friday deal banner", expectedBannerType: "discount", expectedStyleTheme: "luxury-elegant" },
  { input: "Bold urgent flash sale countdown", expectedBannerType: "countdown", expectedStyleTheme: "bold-urgent" },
  { input: "Minimal clean email signup form", expectedBannerType: "email-signup", expectedStyleTheme: "minimal" },
  { input: "Book me a flight to Tokyo", expectedBannerType: "unknown", expectedStyleTheme: "unknown" },
  { input: "What is the weather today?", expectedBannerType: "unknown", expectedStyleTheme: "unknown" },
];

async function runTests() {
  let passed = 0;
  let failed = 0;

  for (const { input, expectedBannerType, expectedStyleTheme } of testCases) {
    try {
      console.log(`\n--- "${input}" ---`);
      const result = await testGraph.invoke({
        ...initialState,
        userInput: input,
        bannerType: "",
        styleTheme: "",
      });

      const bannerOk = result.bannerType === expectedBannerType;
      const themeOk = result.styleTheme === expectedStyleTheme;
      const ok = bannerOk && themeOk;

      if (ok) {
        passed++;
        console.log(`  ✅ PASS | bannerType="${result.bannerType}", styleTheme="${result.styleTheme}"`);
      } else {
        failed++;
        console.log(`  ❌ FAIL | bannerType: expected "${expectedBannerType}", got "${result.bannerType}" | styleTheme: expected "${expectedStyleTheme}", got "${result.styleTheme}"`);
      }
    } catch (err) {
      failed++;
      console.log(`  💥 ERROR: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log(`\n${passed}/${testCases.length} passed, ${failed} failed`);
}

runTests();
