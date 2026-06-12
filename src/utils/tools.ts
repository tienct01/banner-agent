import { tool } from "@langchain/core/tools";
import { z } from "zod";
import * as readline from "readline";
import { getUnsplashClient } from "../lib/unsplash.js";

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

const unsplashSearchImageSchema = z.object({
  query: z
    .string()
    .min(1)
    .describe("The image search query, such as summer sale fashion banner."),
  page: z
    .number()
    .int()
    .min(1)
    .default(1)
    .describe("The result page to fetch."),
  perPage: z
    .number()
    .int()
    .min(1)
    .max(10)
    .default(5)
    .describe("Number of images to return, from 1 to 10."),
  orientation: z
    .enum(["landscape", "portrait", "squarish"])
    .optional()
    .describe("Optional image orientation filter."),
  color: z
    .enum([
      "black_and_white",
      "black",
      "white",
      "yellow",
      "orange",
      "red",
      "purple",
      "magenta",
      "green",
      "teal",
      "blue",
    ])
    .optional()
    .describe("Optional dominant color filter."),
});

export const searchUnsplashImagesTool = tool(
  async ({ query, page, perPage, orientation, color }) => {
    const unsplash = getUnsplashClient();
    const searchParams: {
      query: string;
      page: number;
      per_page: number;
      content_filter: "high";
      orientation?: "landscape" | "portrait" | "squarish";
      color?:
        | "black_and_white"
        | "black"
        | "white"
        | "yellow"
        | "orange"
        | "red"
        | "purple"
        | "magenta"
        | "green"
        | "teal"
        | "blue";
    } = {
      query,
      page,
      per_page: perPage,
      content_filter: "high",
    };

    if (orientation) {
      searchParams.orientation = orientation;
    }

    if (color) {
      searchParams.color = color;
    }

    const result = await unsplash.GET("/search/photos", {
      params: {
        query: searchParams,
      },
    });

    if (result.error) {
      return JSON.stringify({
        error: true,
        message: result.error.errors.join("; "),
      });
    }

    return JSON.stringify({
      total: result.data.total,
      totalPages: result.data.total_pages,
      images: result.data.results.map((photo: any) => ({
        id: photo.id,
        description: photo.description,
        width: photo.width,
        height: photo.height,
        color: photo.color,
        urls: photo.urls,
        links: {
          html: photo.links.html,
          download: photo.links.download,
          downloadLocation: photo.links.download_location,
        },
        photographer: {
          name: photo.user.name,
          username: photo.user.username,
          profileUrl: photo.user.links.html,
        },
      })),
    });
  },
  {
    name: "search_unsplash_images",
    description:
      "Search Unsplash for image assets to use in banners or visual designs. Returns image URLs, dimensions, color, Unsplash page links, photographer attribution, and download tracking links.",
    schema: unsplashSearchImageSchema,
  },
);
