import os

import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

model = None

if api_key:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.5-flash")


def generate_response(prompt: str) -> str:
    """
    Returns an AI response if Gemini is configured.
    Otherwise returns a friendly placeholder.
    """

    if model is None:
        return (
            "AI service is currently unavailable. "
            "Gemini has not been configured yet."
        )

    response = model.generate_content(prompt)

    if response.text:
        return response.text.strip()

    return "Sorry, I couldn't generate a response."