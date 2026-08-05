from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat, documents

app = FastAPI(
    title="Multilingual AI Assistant",
    description="Chat with documents in Malayalam, Hindi and English",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(chat.router, prefix="/chat", tags=["Chat"])
app.include_router(documents.router, prefix="/documents", tags=["Documents"])

@app.get("/")
def root():
    return {"message": "Multilingual AI Assistant API is running!"}

@app.get("/health")
def health():
    return {"status": "healthy"}