import type { NextFunction, Request, Response } from "express";
import { graph } from "src/agent/agent.js";

export type InvokeAgentBody = {
  input: string;
};

export function invokeAgent(
  req: Request<unknown, unknown>,
  res: Response,
  next: NextFunction,
) {
  try {
    graph.invoke();
  } catch (error) {}
}
