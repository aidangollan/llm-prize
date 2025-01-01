import { type TypewriterText } from "~/types";

export const InitializationMessages = ({ 
    initLines, 
    isInitialized 
}: {
    initLines: TypewriterText[];
    isInitialized: boolean;
}) => {
    return (
        <div className="text-[#666666] mb-4">
        <div>{initLines[0]?.text}{!initLines[0]?.isComplete && '▊'}</div>
        <div className="text-[#27c93f]">
            {initLines[0]?.isComplete && (
            <>{initLines[1]?.text}{!initLines[1]?.isComplete && '▊'}</>
            )}
        </div>
        <div>
            {initLines[1]?.isComplete && (
            <>{initLines[2]?.text}{!initLines[2]?.isComplete && '▊'}</>
            )}
        </div>
        {isInitialized && (
            <div className="mt-2 border-b border-[#333333]"></div>
        )}
        </div>
    );
};