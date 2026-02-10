"use client";

import { KeyboardEvent, useRef } from "react";
import { VoiceButton } from "./VoiceButton";

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  isActive: boolean;
  voiceMode: boolean;
  onToggleVoice: () => void;
  isListening: boolean;
  isVoiceSupported: boolean;
  onVoiceStart: () => void;
  onVoiceStop: () => void;
}

export function ChatInput({
  input,
  onInputChange,
  onSend,
  isActive,
  voiceMode,
  onToggleVoice,
  isListening,
  isVoiceSupported,
  onVoiceStart,
  onVoiceStop,
}: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isActive) {
        onSend();
      }
    }
  };

  const handleSend = () => {
    if (input.trim() && !isActive) {
      onSend();
    }
  };

  return (
    <div className="sticky bottom-0 border-t border-white/[0.06] bg-jarvis-bg/60 backdrop-blur-2xl px-4 py-3 pb-safe">
      <div className="max-w-2xl mx-auto">
        {voiceMode ? (
          <div className="flex flex-col items-center gap-3 py-3">
            <VoiceButton
              isListening={isListening}
              isSupported={isVoiceSupported}
              onStart={onVoiceStart}
              onStop={onVoiceStop}
            />
            <span className="text-xs text-jarvis-text-secondary font-medium">
              {isListening ? "Listening..." : "Hold to speak"}
            </span>
            <button
              type="button"
              onClick={onToggleVoice}
              className="text-xs text-jarvis-accent/80 hover:text-jarvis-accent transition-colors"
            >
              Switch to keyboard
            </button>
          </div>
        ) : (
          <div className="flex items-end gap-2">
            {isVoiceSupported && (
              <button
                type="button"
                onClick={onToggleVoice}
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-jarvis-surface/80 border border-white/[0.06] flex items-center justify-center hover:bg-jarvis-surface-light hover:border-jarvis-accent/30 transition-all duration-200"
                title="Switch to voice"
              >
                <svg
                  className="w-5 h-5 text-jarvis-text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                  />
                </svg>
              </button>
            )}

            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Jarvis..."
                rows={1}
                className="w-full resize-none rounded-xl bg-jarvis-surface/80 border border-white/[0.06] text-jarvis-text-primary placeholder-jarvis-text-secondary/60 px-4 py-2.5 text-[15px] focus:outline-none focus:border-jarvis-accent/40 focus:bg-jarvis-surface transition-all duration-200 max-h-32 overflow-y-auto"
                style={{ minHeight: "42px" }}
              />
            </div>

            <button
              type="button"
              onClick={handleSend}
              disabled={isActive || !input.trim()}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-jarvis-accent to-blue-600 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 shadow-lg shadow-jarvis-accent/20 disabled:shadow-none"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
