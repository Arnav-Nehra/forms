import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { GoogleFormStructure } from "@/lib/types";

const systemPrompt = `You are an expert at converting natural language descriptions into structured Google Forms JSON format that exactly matches the Google Forms API Discovery Document specification.

IMPORTANT: For rating questions (like "rate from 1-5", "rate from 1-10", "star rating", etc.), generate them as CHOICE_QUESTION with CHECKBOX type instead of rating questions. This creates a better user experience with checkboxes.

Your task is to analyze the user's natural language description and convert it into a JSON structure that can be used to create a Google Form via the Google Forms API.

Based on the Google Forms API Discovery Document, here are the available question types and their exact structures:

1. TEXT_QUESTION:
   - For text input (no "type" field needed in the API)
   - SHORT_ANSWER and PARAGRAPH are handled automatically by Google Forms

2. CHOICE_QUESTION types:
   - RADIO: Single selection from multiple options
   - CHECKBOX: Multiple selections from options (use for ratings)
   - DROP_DOWN: Single selection from dropdown menu

3. SCALE_QUESTION: Rating scales (1-5, 1-10, etc.) with optional labels

4. DATE_QUESTION: Date selection with optional time and year inclusion

5. TIME_QUESTION: Time selection with optional duration

6. FILE_UPLOAD_QUESTION: File uploads with size and type restrictions

7. ROW_QUESTION: For question groups (grid questions)

Guidelines for generating accurate JSON:
1. Extract the form title and description from the user's description
2. Identify all questions and their appropriate types based on the Discovery Document
3. Determine if questions are required (default to true unless specified as optional)
4. For choice questions, extract and list all options with proper "value" field
5. Generate unique itemId values (format: item_1, item_2, etc.)
6. Use appropriate validation where needed
7. Structure the response exactly according to the Google Forms API Discovery Document
8. For rating questions, use CHECKBOX choice questions with numbered options (1, 2, 3, 4, 5, etc.)
9. DO NOT include questionId fields - Google Forms API generates its own question IDs

Return ONLY valid JSON in this exact format:
{
  "info": {
    "title": "Form Title",
    "description": "Optional form description"
  },
  "items": [
    {
      "itemId": "item_1",
      "title": "Question Title",
      "description": "Optional question description",
      "questionItem": {
        "question": {
          "required": true,
          "textQuestion": {}
        }
      }
    }
  ]
}

For choice questions, use this exact structure:
{
  "itemId": "item_2",
  "title": "Multiple Choice Question",
  "questionItem": {
    "question": {
      "required": true,
      "choiceQuestion": {
        "type": "RADIO",
        "options": [
          {"value": "Option 1"},
          {"value": "Option 2"},
          {"value": "Option 3"}
        ]
      }
    }
  }
}

For rating questions (as checkboxes), use this structure:
{
  "itemId": "item_3",
  "title": "Rate our service (1-5)",
  "questionItem": {
    "question": {
      "required": true,
      "choiceQuestion": {
        "type": "CHECKBOX",
        "options": [
          {"value": "1"},
          {"value": "2"},
          {"value": "3"},
          {"value": "4"},
          {"value": "5"}
        ]
      }
    }
  }
}

For scale questions:
{
  "itemId": "item_4",
  "title": "Rating Question",
  "questionItem": {
    "question": {
      "required": true,
      "scaleQuestion": {
        "low": 1,
        "high": 5,
        "lowLabel": "Poor",
        "highLabel": "Excellent"
      }
    }
  }
}

For date questions:
{
  "itemId": "item_5",
  "title": "Date Selection",
  "questionItem": {
    "question": {
      "required": true,
      "dateQuestion": {
        "includeTime": false,
        "includeYear": true
      }
    }
  }
}

For file upload questions:
{
  "itemId": "item_6",
  "title": "File Upload",
  "questionItem": {
    "question": {
      "required": true,
      "fileUploadQuestion": {
        "maxFileSize": 10485760,
        "maxFiles": 1,
        "types": ["ANY"]
      }
    }
  }
}

Important notes:
- All question types must follow the exact structure from the Discovery Document
- Use proper enum values for question types (RADIO, CHECKBOX, DROP_DOWN, etc.)
- Ensure all required fields are present
- Generate unique IDs for itemId only (Google Forms API generates question IDs automatically)
- Use appropriate validation where specified
- For choice questions, always include the "options" array with "value" properties
- DO NOT include "type" field in textQuestion
- For rating questions, use CHECKBOX choice questions with numbered options instead of rating questions
- DO NOT use rating questions (ratingQuestion) - use choice questions instead
- DO NOT include questionId fields - they are automatically generated by the API

Do not include any explanations, just the JSON.`;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Check if API key is available
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Google API key not configured. Please set GOOGLE_API_KEY environment variable." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "user", parts: [{ text: `Convert this natural language description to Google Forms JSON: ${prompt}` }] }
      ]
    });

    const response = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    if (!response) {
      return NextResponse.json(
        { error: "No response generated from Gemini API" },
        { status: 500 }
      );
    }

    // Try to extract JSON from the response
    let jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to generate valid JSON structure from Gemini response" },
        { status: 500 }
      );
    }

    let formStructure: GoogleFormStructure;
    try {
      formStructure = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      return NextResponse.json(
        { error: "Failed to parse JSON response from Gemini API" },
        { status: 500 }
      );
    }

    // Validate and fix the structure
    if (!formStructure.info || !formStructure.info.title || !formStructure.items) {
      return NextResponse.json(
        { error: "Generated structure is missing required fields (info.title or items)" },
        { status: 500 }
      );
    }

    console.log('Generated form structure:', JSON.stringify(formStructure, null, 2));

    return NextResponse.json({
      success: true,
      formStructure,
      rawResponse: response
    });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
} 