from flask import Flask, request, jsonify
from rag_engine import ask_chatbot

app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    question = data.get("question")

    if not question:
        return jsonify({"error": "Question is required"}), 400

    answer = ask_chatbot(question)
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
