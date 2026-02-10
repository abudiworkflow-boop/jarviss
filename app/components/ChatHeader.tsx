"use client";

import { StatusIndicator } from "./StatusIndicator";

interface ChatHeaderProps {
  isActive: boolean;
  isListening: boolean;
  isSpeaking: boolean;
}

export function ChatHeader({
  isActive,
  isListening,
  isSpeaking,
}: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-jarvis-bg/80 backdrop-blur-xl border-b border-jarvis-border/50">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-jarvis-text-primary">
          Jarvis
        </h1>
        <StatusIndicator
          isActive={isActive}
          isListening={isListening}
          isSpeaking={isSpeaking}
        />
      </div>
    </header>
  );
}
