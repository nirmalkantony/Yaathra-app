const express = require("express");
const router = express.Router();
const { askChatbot } = require("../services/chatbot.service");

router.post("/chatbot", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const answer = await askChatbot(question);
    res.json({ answer });
  } catch (err) {
    res.status(503).json({ error: "Chatbot is unavailable" });
  }
});

module.exports = router;
