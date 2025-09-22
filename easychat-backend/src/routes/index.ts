import { Router, Request, Response, NextFunction } from "express";
import messageRouter from "./message";

const router = Router();

router.use("/messages", messageRouter);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: "Chatify API is running!",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Database error:", error);
    res.status(500).json({
      message: "API running but database error",
      error: error.message,
    });
  }
});

export default router;
