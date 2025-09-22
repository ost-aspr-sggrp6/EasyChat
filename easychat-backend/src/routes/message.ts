import { Router, Request, Response } from "express";
import Message from "../schema/messageSchema";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { message, sender, chatId } = req.body;
        const newMessage = new Message({ message, sender, chatId });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:chatId", async (req: Request, res: Response) => {
    try {
        const messages = await Message.find({ chatId: req.params.chatId });
        res.json(messages);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
