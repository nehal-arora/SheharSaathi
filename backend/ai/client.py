import os

import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

model = None

if api_key:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash"
    )


def is_ai_available() -> bool:
    """
    Returns True if Gemini is configured.
    """
    return model is not None


def generate_response(prompt: str) -> str:
    """
    Sends a prompt to Gemini and returns the text response.
    Falls back gracefully if Gemini is unavailable.
    """

    if model is None:
        return (
            "AI service is currently unavailable. "
            "Please try again later."
        )

    try:
        response = model.generate_content(prompt)

        if (
            hasattr(response, "text")
            and response.text
        ):
            return response.text.strip()

        return (
            "Sorry, I couldn't generate a response."
        )

    except Exception as e:
        print(f"Gemini Error: {e}")

        return (
            "Something went wrong while contacting "
            "the AI service."
        )