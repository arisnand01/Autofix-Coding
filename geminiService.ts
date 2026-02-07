
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, RiskLevel } from "./types";

export const analyzeAndFixCode = async (code: string, issue: string): Promise<AnalysisResult> => {
  /**
   * IMPORTANT: We instantiate the AI client inside the function call.
   * This ensures that we always pick up the latest 'process.env.API_KEY' 
   * provided by the environment, which is the required pattern for this architecture.
   */
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this code issue and provide a fix.\n\nCODE:\n${code}\n\nISSUE:\n${issue}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          rootCause: { type: Type.STRING, description: "Technical root cause of the bug" },
          technicalSolution: { type: Type.STRING, description: "Explanation of the fix" },
          fixedCode: { type: Type.STRING, description: "The complete fixed code block" },
          riskAssessment: { type: Type.STRING, description: "What could go wrong if merged" },
          impact: { type: Type.STRING, description: "System impact of this change" },
          riskLevel: { type: Type.STRING, enum: Object.values(RiskLevel) }
        },
        required: ["rootCause", "technicalSolution", "fixedCode", "riskAssessment", "impact", "riskLevel"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Empty response from Gemini API");
  }

  return JSON.parse(response.text) as AnalysisResult;
};
