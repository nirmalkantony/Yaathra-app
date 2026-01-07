import json
import faiss
import pickle
import numpy as np
from pathlib import Path
from sentence_transformers import SentenceTransformer

# Base directory = this file's location
BASE_DIR = Path(__file__).resolve().parent

DATA_PATH = BASE_DIR / "data" / "places.json"
EMBEDDINGS_DIR = BASE_DIR / "embeddings"
EMBEDDINGS_DIR.mkdir(exist_ok=True)

print("Loading embedding model...")
model = SentenceTransformer("all-MiniLM-L6-v2")

print("Loading tourism data...")
with open(DATA_PATH, "r", encoding="utf-8") as f:
    places = json.load(f)

texts = [p["content"] for p in places]

print("Generating embeddings...")
embeddings = model.encode(texts)
embeddings = np.array(embeddings).astype("float32")

print("Creating FAISS index...")
index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)

faiss.write_index(index, str(EMBEDDINGS_DIR / "tourism.index"))

with open(EMBEDDINGS_DIR / "meta.pkl", "wb") as f:
    pickle.dump(places, f)

print("✅ Vector index created successfully")
print(f"📁 Saved to: {EMBEDDINGS_DIR}")
