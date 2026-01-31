
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  // Use a fresh instance with process.env.API_KEY as per guidelines
  private static getClient() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  // Analyzes art for authenticity using Gemini 3 Pro
  static async analyzeArtAuthenticity(base64Image: string, mimeType: string) {
    const ai = this.getClient();
    const prompt = `Act as a world-class art authenticator. 
    Analyze this painting for:
    1. Pigment age (estimate based on texture/cracking).
    2. Origin logos or distinctive guild marks.
    3. Hidden 'undercover' layers or alterations.
    Keep it technical but fascinating. Format as bullet points.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: { parts: [{ inlineData: { data: base64Image, mimeType: mimeType } }, { text: prompt }] }
      });
      return response.text;
    } catch (error) {
      console.error("Art Analysis error:", error);
      return "Unable to authenticate. Connection lost.";
    }
  }

  // Analyzes wall space for painting placement using Gemini 3 Flash
  static async analyzeWallSuitability(base64Image: string, mimeType: string) {
    const ai = this.getClient();
    const prompt = `Act as an Interior Design and Furniture Expert AI. Analyze this room/wall space for displaying a high-end painting:
    1. Lighting conditions (Glare, shadows, and best color temperature).
    2. Wall size and color suitability for art.
    3. Furniture Synergy: Suggest 2 specific pieces of furniture (e.g., 'A velvet mid-century armchair', 'A minimalist oak console') that would anchor the space beneath or around the art.
    4. Provide a "Room Synergy Score" out of 100.
    Format the response clearly with bold headers for 'Lighting', 'Wall Profile', and 'Furniture Recommendations'.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ inlineData: { data: base64Image, mimeType: mimeType } }, { text: prompt }] }
      });
      return response.text;
    } catch (error) {
      return "Scanning environment for synergy...";
    }
  }

  // Generic image analysis for personality breakdown
  static async analyzeImage(base64Image: string, mimeType: string) {
    const ai = this.getClient();
    const prompt = "Act as an Art & Personality Expert. Provide an AI-powered personality breakdown based on this profile image or artwork. Be insightful, creative, and slightly provocative.";
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ inlineData: { data: base64Image, mimeType: mimeType } }, { text: prompt }] }
      });
      return response.text;
    } catch (error) {
      console.error("Image analysis error:", error);
      throw error;
    }
  }

  // Generates cinematic video using Veo 3.1
  static async generateVeoVideo(base64Image: string, mimeType: string, prompt: string) {
    if (typeof window !== 'undefined' && (window as any).aistudio) {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
      }
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: {
          imageBytes: base64Image,
          mimeType: mimeType,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("No video generated");
      
      return `${downloadLink}&key=${process.env.API_KEY}`;
    } catch (error: any) {
      if (error?.message?.includes("Requested entity was not found")) {
        if (typeof window !== 'undefined' && (window as any).aistudio) {
          await (window as any).aistudio.openSelectKey();
        }
      }
      console.error("Veo Video generation error:", error);
      throw error;
    }
  }
}
