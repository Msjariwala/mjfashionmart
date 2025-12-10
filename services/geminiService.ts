import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { MOCK_PRODUCTS } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

// Create a system prompt that knows about the products
const getSystemInstruction = () => {
  const productContext = MOCK_PRODUCTS.map(p => 
    `- ${p.name} ($${p.price}): ${p.description} (ID: ${p.id})`
  ).join('\n');

  return `You are MJ, a helpful and friendly AI shopping assistant for MJFashionMart. 
  You help customers find products, answer questions about specifications, and provide style advice.
  
  Here is our current product catalog:
  ${productContext}
  
  Rules:
  1. Be concise and polite.
  2. If a user asks for a product recommendation, suggest items from the catalog.
  3. You can answer general questions, but try to relate them back to our products if relevant.
  4. If asked about prices, use the exact prices listed.
  5. Do not invent products that are not in the list.`;
};

export const createShoppingChat = (): Chat => {
  const ai = getAiClient();
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: getSystemInstruction(),
    },
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I'm having trouble understanding right now. Can you try again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm currently offline or experiencing high traffic. Please try again later.";
  }
};