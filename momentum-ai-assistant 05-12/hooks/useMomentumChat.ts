
import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { SYSTEM_PROMPT } from '../constants';

// Ensure the API key is available, otherwise show an error.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });

export function useMomentumChat() {
  const chatRef = useRef<Chat | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeChat = () => {
      try {
        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_PROMPT,
          },
        });
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      }
    };
    initializeChat();
  }, []);

  const sendMessage = async (
    message: string,
    onChunk: (chunk: string) => void,
    onComplete: () => void
  ) => {
    if (!chatRef.current) {
      console.error("Chat not initialized");
      onChunk("L'assistente non è al momento disponibile. Riprova più tardi.");
      onComplete();
      return;
    }

    try {
      const stream = await chatRef.current.sendMessageStream({ message });
      let fullResponse = "";
      for await (const chunk of stream) {
        // The chunk type is GenerateContentResponse.
        const chunkText = chunk.text;
        if (chunkText) {
          fullResponse += chunkText;
          onChunk(fullResponse);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      onChunk("Si è verificato un errore. Riprova o contatta il supporto se il problema persiste.");
    } finally {
      onComplete();
    }
  };

  return { sendMessage, isInitialized };
}
