import { Router } from "express";

const agentRouter = Router();

agentRouter.post("/thread/:threadId/stream", threadStream);
