import { tool } from "@langchain/core/tools";
import { z } from "zod";
import * as readline from "readline";

const askUserSchema = z.object({
  question: z.string().describe("The question to ask the user"),
});

function promptUser(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`\n[AGENT] ${question}\n> `, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

export const askUserTool = tool(
  async ({ question }) => {
    const answer = await promptUser(question);
    if (!answer) {
      return "User did not provide an answer.";
    }
    return answer;
  },
  {
    name: "ask_user",
    description:
      "Ask the user a question and get their response. Use this when you need clarification or additional information from the user, such as confirming the banner type, collecting missing details, or validating your understanding of the request.",
    schema: askUserSchema,
  },
);
