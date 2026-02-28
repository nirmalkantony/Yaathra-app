/**
 * Chatbot Service
 * Uses Ollama (local LLM) to answer ONLY Trivandrum travel queries
 */

const fetch = require('node-fetch'); // ✅ REQUIRED

const OLLAMA_URL = 'http://localhost:11434/api/chat';
const MODEL = 'mistral:latest'; // ✅ Explicit model

/**
 * System prompt to strictly limit the AI
 */
function buildSystemPrompt() {
  return `
You are "Yaathra AI", a local travel guide ONLY for Trivandrum (Thiruvananthapuram), Kerala, India.

STRICT RULES:
- Answer ONLY Trivandrum travel related questions.
- Allowed topics:
  • Tourist places
  • Beaches
  • Temples
  • Food & restaurants
  • Local transport
  • 1-day / 2-day / 3-day itineraries
  • Best time to visit
  • Travel tips
- If the user asks anything outside Trivandrum travel:
  → Politely say you can only help with Trivandrum travel.
- Keep responses SHORT (2–5 lines).
- Be friendly, like a local guide.
- Do NOT give long paragraphs unless explicitly asked.

You are NOT a general AI assistant.
`;
}

/**
 * Ask Ollama chatbot
 * @param {string} question
 * @returns {Promise<string>}
 */
async function askChatbot(question) {
  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        stream: false,            // ✅ faster & stable
        messages: [
          {
            role: 'system',
            content: buildSystemPrompt(),
          },
          {
            role: 'user',
            content: question,
          },
        ],
        options: {
          temperature: 0.3,       // ✅ focused answers
          num_predict: 120,       // ✅ prevents long essays
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.message || !data.message.content) {
      return '⚠️ I could not generate a response. Please try again.';
    }

    return data.message.content.trim();
  } catch (error) {
    console.error('❌ Ollama Chatbot Error:', error.message);
    return '⚠️ The travel assistant is currently unavailable.';
  }
}

module.exports = {
  askChatbot,
};
