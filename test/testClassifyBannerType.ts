import { StateGraph, START, END } from "@langchain/langgraph";
import { BannerAgentState } from "../src/agent/state.js";
import { classifyIntent } from "../src/agent/nodes.js";
import { configDotenv } from "dotenv";
configDotenv();

const testCases: { input: string; expectedBannerType: string; expectedStyleTheme: string }[] = [
  { input: "Create a christmas sale banner", expectedBannerType: "discount", expectedStyleTheme: "seasonal-holiday" },
  { input: "Show a countdown timer for New Year's Eve", expectedBannerType: "countdown", expectedStyleTheme: "seasonal-holiday" },
  { input: "Rotate multiple announcement messages in the header", expectedBannerType: "announcement-rotate", expectedStyleTheme: "unknown" },
  { input: "A single announcement bar for free shipping", expectedBannerType: "free-shipping", expectedStyleTheme: "unknown" },
  { input: "Collect emails for our newsletter", expectedBannerType: "email-signup", expectedStyleTheme: "unknown" },
  { input: "A scrolling announcement text across the top", expectedBannerType: "announcement-running", expectedStyleTheme: "unknown" },
  { input: "Show one announcement message at the top", expectedBannerType: "announcement-single", expectedStyleTheme: "unknown" },
  { input: "A slider with multiple promotional banners", expectedBannerType: "multi-banner", expectedStyleTheme: "unknown" },
  { input: "Luxury premium black friday deal banner", expectedBannerType: "discount", expectedStyleTheme: "luxury-elegant" },
  { input: "Bold urgent flash sale countdown", expectedBannerType: "countdown", expectedStyleTheme: "bold-urgent" },
  { input: "Minimal clean email signup form", expectedBannerType: "email-signup", expectedStyleTheme: "minimal" },
  { input: "Book me a flight to Tokyo", expectedBannerType: "unknown", expectedStyleTheme: "unknown" },
  { input: "What is the weather today?", expectedBannerType: "unknown", expectedStyleTheme: "unknown" },
  { input: "Change my account password", expectedBannerType: "unknown", expectedStyleTheme: "unknown" },
];

async function runTests() {
  const graph = new StateGraph(BannerAgentState)
    .addNode("classify", classifyIntent)
    .addEdge(START, "classify")
    .addEdge("classify", END)
    .compile();

  let passed = 0;
  let failed = 0;

  for (const { input, expectedBannerType, expectedStyleTheme } of testCases) {
    try {
      const result = await graph.invoke({
        userInput: input,
        messages: [],
        bannerType: "",
        styleTheme: "",
      });

      const bannerOk = result.bannerType === expectedBannerType;
      const themeOk = result.styleTheme === expectedStyleTheme;
      const ok = bannerOk && themeOk;

      if (ok) {
        passed++;
        console.log(`✅ PASS | "${input}" → bannerType="${result.bannerType}", styleTheme="${result.styleTheme}"`);
      } else {
        failed++;
        const bannerStatus = bannerOk ? "✅" : "❌";
        const themeStatus = themeOk ? "✅" : "❌";
        console.log(`❌ FAIL | "${input}"`);
        console.log(`   ${bannerStatus} bannerType: expected "${expectedBannerType}", got "${result.bannerType}"`);
        console.log(`   ${themeStatus} styleTheme: expected "${expectedStyleTheme}", got "${result.styleTheme}"`);
      }
    } catch (err) {
      failed++;
      console.log(`💥 ERROR | "${input}" → ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log(`\n${passed}/${testCases.length} passed, ${failed} failed`);
}

runTests();