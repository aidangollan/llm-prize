import { GPT } from "~/constants/llm";
import { generateResponse } from "~/server/actions/llm";
import { addMessage } from "~/server/actions/message";
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
      const responseGenerator = await generateResponse({ history: history, message: message, type: GPT });
      
      let response = '';

      for await (const chunk of responseGenerator) {
        callback(chunk);
        response += chunk;
      }

      void addMessage({
        content: response,
        type: 'robot',
        human_question: message
      });
    } catch (error) {
      console.log(error);
      callback("sorry, there was an error processing your request. go yell at aidan on twitter or something.");
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