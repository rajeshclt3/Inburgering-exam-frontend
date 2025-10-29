
import { GoogleGenAI, Type } from "@google/genai";
import { PracticeQuestion, Feedback } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Please set it to use the Gemini API.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const feedbackSchema = {
  type: Type.OBJECT,
  properties: {
    evaluation: {
      type: Type.STRING,
      enum: ['correct', 'minor_errors', 'major_errors', 'off_topic'],
      description: 'Overall evaluation of the user\'s answer.'
    },
    explanation: {
      type: Type.STRING,
      description: 'A general, encouraging explanation of the feedback in simple Dutch.'
    },
    corrections: {
      type: Type.ARRAY,
      description: 'A list of specific mistakes found in the text.',
      items: {
        type: Type.OBJECT,
        properties: {
          original: {
            type: Type.STRING,
            description: 'The exact part of the user\'s text with the mistake.'
          },
          corrected: {
            type: Type.STRING,
            description: 'The corrected version of that part.'
          },
          reason: {
            type: Type.STRING,
            description: 'A simple, A2-level explanation in Dutch of why it was a mistake (e.g., "verkeerde woordvolgorde", "fout lidwoord").'
          }
        },
        required: ['original', 'corrected', 'reason']
      }
    },
    suggestedAnswer: {
      type: Type.STRING,
      description: 'A complete, correct, and natural-sounding sample answer at the A2 level.'
    }
  },
  required: ['evaluation', 'explanation', 'corrections', 'suggestedAnswer']
};

export const analyzeAnswer = async (question: PracticeQuestion, userAnswer: string): Promise<Feedback | null> => {
  try {
    const prompt = `
      Je bent een vriendelijke en behulpzame leraar Nederlands voor een A2-niveau student die oefent voor het inburgeringsexamen.
      De student heeft een antwoord gegeven op de volgende vraag.
      Vraag: "${question.prompt}"
      Context: "${question.context}"

      Antwoord van de student: "${userAnswer}"

      Analyseer het antwoord van de student. Geef feedback in het Nederlands op A2-niveau.
      Focus op de meest voorkomende fouten zoals woordvolgorde, lidwoorden (de/het), werkwoordvervoeging en preposities.
      Wees bemoedigend.
      Retourneer je analyse in het opgegeven JSON-formaat.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: feedbackSchema,
        temperature: 0.3,
      },
    });

    const jsonText = response.text.trim();
    const feedback: Feedback = JSON.parse(jsonText);
    return feedback;

  } catch (error) {
    console.error("Error analyzing answer with Gemini API:", error);
    return null;
  }
};
