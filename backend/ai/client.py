import os

import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_response(prompt: str) -> str:
    system_prompt = f"""
You are SheharSaathi AI.

You help users who are relocating to a new city.

Your responsibilities include:
- Finding suitable localities
- Housing guidance
- Rental safety advice
- Budget planning
- Roommate suggestions
- Student relocation
- Metro connectivity
- Safety recommendations

Give practical, concise and well-structured answers.

User Question:
{prompt}
"""

    response = model.generate_content(system_prompt)

    if response.text:
        return response.text.strip()

    return "Sorry, I couldn't generate a response."