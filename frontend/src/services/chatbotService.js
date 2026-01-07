const API_URL = "http://10.0.2.2:3000/api/chatbot";
// Android emulator
// Real device → use your laptop IP

export async function askChatbot(question) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    return data.answer;
  } catch (err) {
    return "Chatbot service unavailable.";
  }
}
