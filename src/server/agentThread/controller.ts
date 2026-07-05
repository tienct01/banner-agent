import type { RequestHandler } from "express";

export const handleStream: RequestHandler = async (req, res, next) => {
  try {
    const threadId = req.params['threadId'];
    const params = (await req.json())
  } catch (error) {
    next(error);
  }
}
