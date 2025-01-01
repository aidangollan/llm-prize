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
      console.log("groq")
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const responseGenerator = await generateResponse({ history: history, message: message, type: 'groq' });
      
      let response = '';

      for await (const chunk of responseGenerator) {
        callback(chunk);
        response += chunk;
      }

      void addMessage({content: response});
    } catch (error) {
      console.log(error);
      console.log("gpt")
      try {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const responseGenerator = await generateResponse({ history: history, message: message, type: 'gpt' });

        let response = '';
      
        for await (const chunk of responseGenerator) {
          callback(chunk);
          response += chunk;
        }

        void addMessage({content: response});
      } catch (error) {
        console.log(error);
        callback("sorry, there was an error processing your request. go yell at aidan on twitter.");
      }
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