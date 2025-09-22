import { Router, Request, Response, NextFunction } from "express";
import Message from "../schema/messageSchema"; // Message Model

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = new Message({ message: "Hello World" });
    console.log(message.message);
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
