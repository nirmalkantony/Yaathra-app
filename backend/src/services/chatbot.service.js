const axios = require("axios");

const CHATBOT_URL = "http://localhost:5001/chat";

async function askChatbot(question) {
  try {
    const response = await axios.post(
      CHATBOT_URL,
      { question },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.answer;
  } catch (error) {
    console.error("Chatbot error:", error.message);
    throw new Error("Chatbot service unavailable");
  }
}

module.exports = {
  askChatbot
};
