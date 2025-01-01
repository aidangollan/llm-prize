export interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}
  
export interface TypewriterText {
    text: string;
    isComplete: boolean;
}
  