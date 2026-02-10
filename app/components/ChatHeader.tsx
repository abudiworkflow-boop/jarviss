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
    <header className="sticky top-0 z-10 px-4 py-3 bg-jarvis-bg/60 backdrop-blur-2xl border-b border-white/[0.06]">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br from-jarvis-accent to-jarvis-accent-light flex items-center justify-center ${isActive ? "animate-voice-pulse" : ""}`}>
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
              </svg>
            </div>
            {isActive && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-jarvis-accent rounded-full border-2 border-jarvis-bg animate-pulse" />
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-semibold text-jarvis-text-primary tracking-tight">
              Jarvis
            </h1>
            <StatusIndicator
              isActive={isActive}
              isListening={isListening}
              isSpeaking={isSpeaking}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
