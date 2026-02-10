"use client";

import type { Message } from "@/lib/types";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const text = message.content;

  if (!text) return null;

  return (
    <div
      className={`flex animate-message-in ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] ${
          isUser
            ? "bg-gradient-to-br from-jarvis-accent to-blue-600 text-white rounded-2xl rounded-br-md px-4 py-2.5 shadow-lg shadow-jarvis-accent/10"
            : "bg-jarvis-surface/80 border border-white/[0.06] text-jarvis-text-primary rounded-2xl rounded-bl-md px-4 py-2.5"
        }`}
      >
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
          {text}
        </p>
      </div>
    </div>
  );
}
