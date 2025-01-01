import { type Message } from "~/types";

export const MessageList = ({ 
    messages 
}: {
    messages: Message[];
}) => {
    return (
      <>
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <div className="text-[#666666] text-sm mb-1">
              [{message.timestamp}] {message.role === 'user' ? '>' : '#'}
            </div>
            <div className={
              message.role === 'assistant' 
                ? 'text-[#27c93f]' 
                : 'text-[#ffffff]'
            }>
              {message.content}
            </div>
          </div>
        ))}
      </>
    );
};