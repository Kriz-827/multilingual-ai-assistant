from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# Load multilingual model — supports Malayalam, Hindi, English!
print("Loading embedding model...")
model = SentenceTransformer('paraphrase-multilingual-mpnet-base-v2')
print("Model loaded!")

# Store our FAISS index and chunk mapping
faiss_index = None
chunk_mapping = []  # Maps index position to actual text

def generate_embeddings(chunks: list):
    """
    Convert text chunks to vectors
    """
    embeddings = model.encode(chunks)
    return embeddings

def build_faiss_index(chunks: list):
    """
    Build searchable vector index from chunks
    """
    global faiss_index, chunk_mapping
    
    # Generate embeddings for all chunks
    embeddings = generate_embeddings(chunks)
    
    # Get embedding dimension
    dimension = embeddings.shape[1]
    
    # Create FAISS index
    faiss_index = faiss.IndexFlatL2(dimension)
    
    # Add embeddings to index
    faiss_index.add(np.array(embeddings, dtype=np.float32))
    
    # Store chunks for retrieval
    chunk_mapping = chunks
    
    print(f"Built FAISS index with {len(chunks)} chunks!")
    return len(chunks)

def search_similar_chunks(query: str, top_k: int = 3):
    """
    Find most relevant chunks for a query
    """
    global faiss_index, chunk_mapping
    
    if faiss_index is None:
        return []
    
    # Convert query to vector
    query_embedding = model.encode([query])
    
    # Search for similar vectors
    distances, indices = faiss_index.search(
        np.array(query_embedding, dtype=np.float32), 
        top_k
    )
    
    # Return relevant chunks
    results = []
    for idx in indices[0]:
        if idx < len(chunk_mapping):
            results.append(chunk_mapping[idx])
    
    return results