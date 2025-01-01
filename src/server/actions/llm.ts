"use server"

import { Groq } from "groq-sdk";
import { type Message } from "~/types";
import { track } from "./track";
import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { SYSTEM_PROMPT } from "~/constants/prompt";
import { GPT, GROQ, MIXTRAL, OMINI } from "~/constants/llm";
import { MESSAGE } from "~/constants/track";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const model = new ChatOpenAI({
  modelName: OMINI,
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  streaming: true,
});

export async function* generateResponse({
  history,
  message,
  type
}: {
  history: Message[];
  message: string;
  type: 'groq' | 'gpt'
}): AsyncGenerator<string> {
  await track({name: MESSAGE});

  if (type === GROQ) {
    await track({name: GROQ});
    const messages = [
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user' as const, content: message },
      { role: 'system' as const, content: await SYSTEM_PROMPT() },
    ];
    
    const completion = await groq.chat.completions.create({
      messages,
      model: MIXTRAL,
      temperature: 0,
      stream: true
    });
    
    for await (const chunk of completion) {
      if (chunk.choices[0]?.delta?.content) {
        yield chunk.choices[0].delta.content;
      }
    }
  } else {
    await track({name: GPT});
    const messages = [
      ...history.map(msg => 
        msg.role === 'user' 
          ? new HumanMessage(msg.content)
          : new AIMessage({ content: String(msg.content) }),
      ),
      new HumanMessage(message),
      new SystemMessage(await SYSTEM_PROMPT())
    ];
  
    const stream = await model.stream(messages);

    for await (const chunk of stream) {
      if (typeof chunk.content === 'string') {
        yield chunk.content;
      } else if (Array.isArray(chunk.content)) {
        yield chunk.content.filter(item => typeof item === 'string').join(' ');
      }
    }
  }
}