import { graph } from "../src/agent.js";
import { configDotenv } from "dotenv";
import * as readline from "readline";

configDotenv();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

async function run() {
  console.log("Banner Agent Interactive (type 'exit' to quit)\n");

  while (true) {
    const input = await prompt("> ");
    if (!input || input.toLowerCase() === "exit") break;

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

      console.log(`\nbannerType : ${result.bannerType}`);
      console.log(`styleTheme : ${result.styleTheme}`);
      console.log(`config     : ${result.bannerConfig}\n`);
    } catch (err) {
      console.log(`\nERROR: ${err instanceof Error ? err.message : String(err)}\n`);
    }
  }

  rl.close();
}

run();
