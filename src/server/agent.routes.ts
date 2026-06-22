import { Router } from "express";

const router = Router();

router.post("/invoke", invokeAgent);

export default router;