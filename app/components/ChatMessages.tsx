"use client";

import { useEffect, useRef } from "react";
import type { Message } from "@/lib/types";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

interface ChatMessagesProps {
  messages: Message[];
  isActive: boolean;
  onSuggestionClick?: (text: string) => void;
}

const SUGGESTIONS = [
  "What's on my calendar today?",
  "Check my n8n workflows",
  "Help me draft a LinkedIn post",
  "Search for PropTech trends in Saudi",
];

export function ChatMessages({ messages, isActive, onSuggestionClick }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isActive]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center px-6 animate-fade-up">
          {/* Logo */}
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-jarvis-accent/20 to-jarvis-accent-light/10 flex items-center justify-center animate-float">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-jarvis-accent to-jarvis-accent-light flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gradient mb-2">
            Hey Abudi
          </h2>
          <p className="text-jarvis-text-secondary text-sm mb-8 max-w-xs">
            Your AI co-pilot is ready. What are we working on?
          </p>

          {/* Quick action suggestions */}
          <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onSuggestionClick?.(suggestion)}
                className="text-left px-3 py-2.5 rounded-xl bg-jarvis-surface/60 border border-white/[0.06] text-xs text-jarvis-text-secondary hover:bg-jarvis-surface-light hover:text-jarvis-text-primary hover:border-jarvis-accent/30 transition-all duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isActive && messages[messages.length - 1]?.role === "user" && (
        <TypingIndicator />
      )}

      <div ref={bottomRef} />
    </div>
  );
}
