import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import type { State } from "./state.js";
import { RemoveMessage } from "@langchain/core/messages";

export async function loadMarkdownFile(path: string): Promise<string> {
  const loader = new TextLoader(path);
  let docs;
  try {
    docs = await loader.load();
  } catch (err) {
    throw new Error(
      `Failed to load ${path}: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
  const doc = docs[0];
  if (!doc) {
    throw new Error(`File is empty: ${path}`);
  }
  return doc.pageContent;
}

export const clearMessages = async (state: State) => {
  return {
    messages: state.messages.map(
      (message) => new RemoveMessage({ id: message.id! }),
    ),
  };
};
