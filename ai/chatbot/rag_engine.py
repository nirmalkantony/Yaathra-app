import faiss
import pickle
from pathlib import Path
from sentence_transformers import SentenceTransformer
import ollama

# Paths
BASE_DIR = Path(__file__).resolve().parent
EMBEDDINGS_DIR = BASE_DIR / "embeddings"

# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Load FAISS index and metadata
index = faiss.read_index(str(EMBEDDINGS_DIR / "tourism.index"))

with open(EMBEDDINGS_DIR / "meta.pkl", "rb") as f:
    places = pickle.load(f)

def ask_chatbot(question, top_k=3):
    # Convert question to vector
    q_embedding = model.encode([question])

    # Search similar content
    distances, indices = index.search(q_embedding, top_k)

    # Build context
    context = ""
    for idx in indices[0]:
        context += places[idx]["content"] + "\n\n"

    # Prompt (hallucination-safe)
    prompt = f"""
You are a tourism guide chatbot.
Answer ONLY using the context below.
If the answer is not in the context, say you do not know.

Context:
{context}

Question:
{question}
"""

    response = ollama.chat(
        model="mistral",
        messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]
