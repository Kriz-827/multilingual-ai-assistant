#  Multilingual AI Assistant

![Python](https://img.shields.io/badge/Python-3.10-blue?logo=python)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)
![HuggingFace](https://img.shields.io/badge/HuggingFace-Transformers-yellow?logo=huggingface)
![Whisper](https://img.shields.io/badge/OpenAI-Whisper-412991?logo=openai)
![FAISS](https://img.shields.io/badge/FAISS-Vector%20DB-blue)
![License](https://img.shields.io/badge/License-MIT-green)

An end-to-end multilingual AI assistant that lets users chat with documents using voice or text in **English, Malayalam, and Hindi**. Built with a RAG (Retrieval-Augmented Generation) pipeline, fine-tuned Whisper ASR for Malayalam voice input, and a modern React frontend.

---

##  Features

-  **Voice Input** — Speak in Malayalam, Hindi, or English using fine-tuned Whisper ASR
-  **Chat with Documents** — Upload PDF, DOCX, or TXT files and ask questions
-  **RAG Pipeline** — Retrieval-Augmented Generation for accurate, cited answers
-  **Vector Database** — FAISS-powered semantic search for fast retrieval
-  **Multilingual** — Full support for English, Malayalam, and Hindi
-  **Text-to-Speech** — Hear responses spoken back in your language
-  **Conversation Memory** — Remembers context across multiple messages
-  **Source Citations** — Every answer shows which document it came from
-  **User Authentication** — Secure login with JWT tokens
-  **Chat History** — All conversations saved and accessible

---

##  Architecture

```
User (Voice/Text)
        │
        ▼
React Frontend
        │
        ▼
FastAPI Backend
        │
        ├── Whisper STT ──────── Voice → Text
        │
        ├── Document Processor ── PDF/DOCX/TXT → Chunks
        │
        ├── Embedding Model ───── Chunks → Vectors
        │
        ├── FAISS Vector DB ───── Semantic Search
        │
        └── LLM (Llama/GPT) ───── Generate Answer
                │
                ▼
        Answer + Citations + TTS
```

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + TailwindCSS |
| Backend | FastAPI + Uvicorn |
| Speech-to-Text | OpenAI Whisper (fine-tuned for Malayalam) |
| Text-to-Speech | gTTS |
| Embeddings | Sentence Transformers (multilingual) |
| Vector Database | FAISS |
| LLM | Llama 3 / GPT-4o-mini |
| Database | PostgreSQL |
| Authentication | JWT + bcrypt |
| Deployment | Docker + Render + Vercel |

---

##  Project Structure

```
multilingual-ai-assistant/
│
├── frontend/                    
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx
│   │   │   ├── Recorder.jsx     
│   │   │   ├── DocumentUpload.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/                     
│   ├── app/
│   │   ├── main.py              
│   │   ├── routes/
│   │   │   ├── chat.py
│   │   │   ├── documents.py
│   │   │   └── auth.py
│   │   ├── services/
│   │   │   ├── rag_service.py
│   │   │   ├── embedding_service.py
│   │   │   ├── whisper_service.py
│   │   │   └── llm_service.py
│   │   └── models/
│   │       ├── user.py
│   │       └── chat.py
│   └── requirements.txt
│
├── docker-compose.yml           
├── README.md                    
└── .env.example                 
```

---

##  Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL
- Git

### Clone the Repository

```bash
git clone https://github.com/Kriz-827/multilingual-ai-assistant
cd multilingual-ai-assistant
```

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env      # Add your API keys
uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the backend folder:

```env
OPENAI_API_KEY=your_openai_key
DATABASE_URL=postgresql://user:password@localhost/dbname
SECRET_KEY=your_jwt_secret
WHISPER_MODEL_PATH=path/to/finetuned/model
```

---

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login, get JWT token |
| POST | /documents/upload | Upload PDF/DOCX/TXT |
| GET | /documents/list | List uploaded documents |
| POST | /chat/message | Send text, get answer |
| POST | /chat/voice | Send audio, get answer |
| GET | /chat/history | Get chat history |

---

##  Key Highlights

- **Malayalam ASR** — Fine-tuned Whisper-small on 1,099 Malayalam audio samples (96% training loss reduction)
- **Multilingual Embeddings** — Uses `paraphrase-multilingual-mpnet-base-v2` for cross-lingual semantic search
- **RAG Pipeline** — Retrieves top-5 relevant chunks before generating answers
- **Source Citations** — Every answer references the exact document and chunk

---

##  Screenshots

*Coming soon — project under active development*

---

##  Roadmap

- [x] Project setup and architecture
- [ ] Phase 1 — Basic RAG pipeline
- [ ] Phase 2 — Voice integration (Whisper)
- [ ] Phase 3 — Malayalam multilingual support
- [ ] Phase 4 — Authentication and chat history
- [ ] Phase 5 — Deployment and live demo

---

##  Team

## 👥 Team

**Krishnendu U N**

B.Tech in Artificial Intelligence & Data Science

[![GitHub](https://img.shields.io/badge/GitHub-Kriz--827-black?logo=github)](https://github.com/Kriz-827)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://linkedin.com/in/krishnendu-u-n-b68361298)

---

**Shalvin Shabu**

B.Tech in Artificial Intelligence & Data Science

[![GitHub](https://img.shields.io/badge/GitHub-shalvin__shabu-black?logo=github)](https://github.com/shalvin-shabu)
---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with  — Combining Speech AI, NLP, and GenAI for multilingual accessibility*
