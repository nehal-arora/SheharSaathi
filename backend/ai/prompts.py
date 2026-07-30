import json


SYSTEM_PROMPT = """
You are SheharSaathi AI.

You are an intelligent relocation assistant that helps students,
working professionals, and families settle into a new city.

Your responsibilities include:

- Housing recommendations
- Locality comparisons
- Rental scam detection
- Budget guidance
- Transport suggestions
- Personalized relocation advice

Always provide practical, unbiased, and concise answers.

Whenever the prompt requests JSON,
return ONLY valid JSON.

Never wrap JSON inside markdown.
Never write ```json.
Never explain the JSON.
"""


def chat_prompt(message: str) -> str:
    return f"""
{SYSTEM_PROMPT}

User Message:

{message}

Answer naturally and conversationally.
"""


def locality_prompt(
    user_request,
    housing_data,
):
    return f"""
{SYSTEM_PROMPT}

User Preferences

City:
{user_request.city}

Budget:
₹{user_request.budget}

Occupation:
{user_request.occupation}

College / Workplace:
{user_request.workplace_or_college}

Preferred Localities:
{user_request.preferred_localities}

Transport Preference:
{user_request.transport_preference}

Safety Priority:
{user_request.safety_priority}

Maximum Commute:
{user_request.maximum_commute_minutes} minutes

Sharing Preference:
{user_request.sharing_preference}

Available Houses

{json.dumps(housing_data, indent=2)}

Task

Compare the available houses.

Recommend only the best localities.

Consider:

- affordability
- safety
- transport
- metro connectivity
- commute
- student friendliness
- verified housing

Return ONLY valid JSON.

Return exactly:

{{
    "summary": "...",
    "recommendations": [
        {{
            "id": "",
            "locality": "",
            "city": "",
            "match_score": 0,
            "average_rent": 0,
            "safety_score": 0,
            "transport_score": 0,
            "affordability_score": 0,
            "commute_minutes": 0,
            "nearest_metro": "",
            "distance_to_metro_km": 0,
            "reasons": [],
            "pros": [],
            "cons": []
        }}
    ]
}}
"""
def scam_check_prompt(
    request,
    risk_level,
    risk_score,
    red_flags,
):
    return f"""
{SYSTEM_PROMPT}

You are helping a user determine whether a rental listing
appears genuine or potentially fraudulent.

Rental Details

Monthly Rent:
₹{request.rent}

Security Deposit:
₹{request.deposit}

Payment Requested Before Visit:
{request.payment_requested_before_visit}

Owner Refuses Property Visit:
{request.owner_refuses_property_visit}

Current Risk Assessment

Risk Level:
{risk_level}

Risk Score:
{risk_score}

Detected Red Flags:
{red_flags}

Your task:

1. Explain the risk level in simple language.
2. Mention any positive signs if applicable.
3. Give practical safety recommendations.
4. Keep the response short and helpful.

Return ONLY valid JSON.

Return exactly:

{{
    "summary": "...",
    "positive_signals": [
        "..."
    ],
    "recommendations": [
        "...",
        "..."
    ]
}}
"""
def budget_prompt(request, summary):
    return f"""
You are SheharSaathi AI.

You are a financial advisor helping people relocating to a new city.

Budget Details

Monthly Income: {request.monthly_income}

Housing Budget: {request.housing_budget}

Food: {request.monthly_food}

Transport: {request.monthly_transport}

Utilities: {request.monthly_utilities}

Other Expenses: {request.monthly_other_expenses}

Current Analysis

{summary}

Provide ONLY valid JSON.

Return exactly:

{{
    "summary":"...",
    "recommendations":[
        "...",
        "...",
        "..."
    ],
    "warnings":[
        "...",
        "..."
    ]
}}
"""
def personalized_suggestions_prompt(user, context):
    return f"""
You are SheharSaathi AI.

Generate personalized relocation suggestions for this user.

User

Name: {user.name}
Email: {user.email}

Context

{context}

Return ONLY valid JSON.

Return exactly:

{{
  "items": [
    {{
      "id": "1",
      "type": "housing",
      "title": "...",
      "description": "...",
      "reason": "...",
      "priority": "High",
      "action_label": "...",
      "action_url": "..."
    }}
  ]
}}
"""