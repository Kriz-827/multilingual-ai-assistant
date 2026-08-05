from fastapi import APIRouter, UploadFile, File, HTTPException
import fitz
import docx
import os
from app.services.document_service import chunk_text
from app.services.embedding_service import build_faiss_index

router = APIRouter()
uploaded_docs = {}

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    allowed_types = [".pdf", ".docx", ".txt"]
    file_ext = os.path.splitext(file.filename)[1].lower()
    
    if file_ext not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, DOCX and TXT files are allowed!"
        )
    
    content = await file.read()
    text = ""
    
    if file_ext == ".pdf":
        pdf = fitz.open(stream=content, filetype="pdf")
        for page in pdf:
            text += page.get_text()
            
    elif file_ext == ".docx":
        import io
        doc = docx.Document(io.BytesIO(content))
        for para in doc.paragraphs:
            text += para.text + "\n"
            
    elif file_ext == ".txt":
        text = content.decode("utf-8")
    
    # Split into chunks
    chunks = chunk_text(text)
    
    # Build FAISS index from chunks
    build_faiss_index(chunks)
    
    doc_id = f"doc_{len(uploaded_docs) + 1}"
    uploaded_docs[doc_id] = {
        "id": doc_id,
        "filename": file.filename,
        "text": text,
        "chunks": chunks,
        "size": len(content)
    }
    
    return {
        "message": "Document uploaded and indexed successfully!",
        "doc_id": doc_id,
        "filename": file.filename,
        "characters": len(text),
        "chunks": len(chunks)
    }

@router.get("/list")
async def list_documents():
    docs = []
    for doc_id, doc in uploaded_docs.items():
        docs.append({
            "id": doc_id,
            "filename": doc["filename"],
            "characters": len(doc["text"]),
            "chunks": len(doc["chunks"])
        })
    return {"documents": docs}