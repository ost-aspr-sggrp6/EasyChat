var express = require("express");
var router = express.Router();
const Message = require("../schema/messageSchema"); // Message Model

/* API Status Check */
router.get("/", async function (req, res, next) {
  try {
    const message = new Message({ message: "Hello World" });
    console.log(message.message); // 'Hello World'

    /*
    await message.save();

    // Alle bisherigen Nachrichten abrufen
    const allMessages = await Message.find().sort({ timestamp: -1 });

    res.json({
      message: "Chatify API is running!",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      savedToDatabase: true,
      totalApiCalls: allMessages.length,
      lastSavedCall: message,
    });
    */
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      message: "API running but database error",
      error: error.message,
    });
  }
});

module.exports = router;
