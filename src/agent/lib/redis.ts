import { createClient } from "redis";
import { configDotenv } from "dotenv";
configDotenv();

export const redisClient = createClient({
  url: process.env.REDIS_URL ?? "",
});
