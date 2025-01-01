import { generateResponse } from "~/server/actions/llm";
import { type Message } from "~/types";

export const streamResponse = async (
    callback: (chunk: string) => void,
    onStart: () => void,
    message: string,
    history: Message[]
): Promise<void> => {
    try {
      onStart();
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const responseGenerator = await generateResponse({ history, message });
      
      for await (const chunk of responseGenerator) {
        callback(chunk);
      }
    } catch (error) {
      callback("sorry, there was an error processing your request. go yell at aidan on twitter.");
    }
};
  
export const getTimestamp = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
};