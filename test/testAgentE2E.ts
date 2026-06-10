import { graph } from "../src/agent.js";
import { configDotenv } from "dotenv";

configDotenv();

const inputs = [
  "Create a luxury elegant christmas sale banner with code XMAS20",
  "Bold urgent flash sale countdown timer ending in 24 hours",
  "Show a single announcement bar saying Welcome to our store",
  "A free shipping progress bar for orders over $50",
  "Minimal clean email signup form for newsletter",
  "Rotate multiple announcement messages in the header",
  "A scrolling marquee announcement text across the top",
  "A slider with 3 promotional banners that auto-transition",
  "Seasonal holiday themed discount banner for black friday with 50% off",
];

async function run() {
  for (const input of inputs) {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`INPUT: "${input}"`);
    console.log("-".repeat(60));

    try {
      const result = await graph.invoke(
        {
          userInput: input,
          messages: [],
          bannerType: "",
          styleTheme: "",
          configDoc: "",
          styleThemeDoc: "",
          bannerConfig: "",
          validationError: "",
        },
        { recursionLimit: 10 },
      );

      console.log(`bannerType : ${result.bannerType}`);
      console.log(`styleTheme : ${result.styleTheme}`);
      console.log(`config     : ${result.bannerConfig}`);
    } catch (err) {
      console.log(`ERROR: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
}

run();
