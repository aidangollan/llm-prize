import { Send, Loader2 } from "lucide-react";
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
    const MAX_CHARS = 500;

    useEffect(() => {
        if (!isStreaming && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isStreaming]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (newValue.length <= MAX_CHARS) {
            setInput(newValue);
        }
    };

    return (
      <form onSubmit={onSubmit} className="p-4 border-t border-[#333333] bg-[#2a2a2a]">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center text-[#666666] font-mono">
            <span>{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="enter command..."
              className="flex-1 bg-transparent text-[#ffffff] placeholder-[#666666] focus:outline-none"
              disabled={isStreaming || !isInitialized}
              maxLength={MAX_CHARS}
            />
            <Button 
              type="submit" 
              disabled={isStreaming || !isInitialized}
              className="bg-[#333333] hover:bg-[#444444] text-[#27c93f]"
            >
              {isStreaming ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="text-xs text-[#666666] text-right">
            {input.length}/{MAX_CHARS}
          </div>
        </div>
      </form>
    );
};