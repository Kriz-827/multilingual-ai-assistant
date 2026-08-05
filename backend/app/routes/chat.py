from fastapi import APIRouter

router = APIRouter()

@router.post("/message")
async def send_message(message: dict):
    """
    Receive a message and return a response
    """
    user_message = message.get("message", "")
    
    # For now just echo back — we'll add AI later!
    return {
        "answer": f"You said: {user_message}",
        "sources": []
    }