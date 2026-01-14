
import { GoogleGenAI, Type } from "@google/genai";
import { QuizData, Grade } from "../types";

export async function generateQuiz(topic: string, grade: Grade): Promise<QuizData> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 5 high-quality multiple choice questions about the topic: "${topic}". 
               The target audience is students in ${grade}. 
               
               CRITICAL DIFFICULTY INSTRUCTIONS:
               - You MUST ensure questions are challenging but solvable for a ${grade} student.
               - Adjust language complexity and the depth of required knowledge to match a ${grade} curriculum or experience level.
               - Elementary: Simple facts, easy-to-understand words.
               - Middle School: Intermediate concepts, requires some connecting of ideas.
               - High School: Advanced details, complex vocabulary, and analytical reasoning.
               - University: Nuanced mastery, historical/thematic depth, and technical terminology.
               
               Each question must have exactly 4 options. 
               If the topic is a Manga or Anime series, focus on plot points, character development, and lore specific to that series, adjusted for the ${grade} level.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.INTEGER },
                text: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                correctAnswerIndex: { type: Type.INTEGER }
              },
              required: ["id", "text", "options", "correctAnswerIndex"]
            }
          }
        },
        required: ["topic", "questions"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from AI");
  
  const parsed = JSON.parse(text);
  return { ...parsed, grade } as QuizData;
}
