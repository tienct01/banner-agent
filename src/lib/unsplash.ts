import { createApi } from "unsplash-js";

let client: ReturnType<typeof createApi> | undefined;

export function getUnsplashClient() {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    throw new Error("UNSPLASH_ACCESS_KEY is required to use the Unsplash API");
  }

  client ??= createApi({
    accessKey,
  });

  return client;
}
