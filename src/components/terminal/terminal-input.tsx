import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { useRef, useEffect } from 'react';

export const TerminalInput = ({ 
    input, 
    setInput, 
    isStreaming, 
    isInitialized, 
    onSubmit 
}: {
    input: string;
    setInput: (value: string) => void;
    isStreaming: boolean;
    isInitialized: boolean;
    onSubmit: (e: React.FormEvent) => void;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isStreaming && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isStreaming]);

    return (
      <form onSubmit={onSubmit} className="p-4 border-t border-[#333333] bg-[#2a2a2a]">
        <div className="flex gap-2 items-center text-[#666666] font-mono">
          <span>{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command..."
            className="flex-1 bg-transparent text-[#ffffff] placeholder-[#666666] focus:outline-none"
            disabled={isStreaming || !isInitialized}
          />
          <Button 
            type="submit" 
            disabled={isStreaming || !isInitialized}
            className="bg-[#333333] hover:bg-[#444444] text-[#27c93f]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    );
};