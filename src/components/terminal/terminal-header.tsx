import { RefreshCw } from 'lucide-react';

export const TerminalHeader = ({ 
  onReset 
}: {
  onReset: () => void;
}) => {
    return (
      <div className="bg-[#2a2a2a] p-2 border-b border-[#333333] flex items-center relative">
        <div className="flex gap-2">
          <button className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-red-400 transition-colors duration-200 relative group">
            <span className="absolute hidden group-hover:block font-bold text-black text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">×</span>
          </button>
          <button className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-yellow-400 transition-colors duration-200 relative group">
            <span className="absolute hidden group-hover:block font-bold text-black text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">−</span>
          </button>
          <button className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-green-400 transition-colors duration-200 relative group">
            <span className="absolute hidden group-hover:block font-bold text-black text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">+</span>
          </button>
        </div>
        <div className="absolute left-0 right-0 text-center text-[#666666] text-sm font-mono">
          CRYPTO_HUNT_TERMINAL_v1.0
        </div>
        <button 
          onClick={onReset}
          className="absolute right-2 text-[#666666] hover:text-white transition-colors duration-200"
          title="Reset conversation"
        >
          <RefreshCw size={16} />
        </button>
      </div>
    );
};