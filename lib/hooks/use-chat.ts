"use client";

import { useCallback, useState } from "react";
import type { Message } from "@/lib/types";

let idCounter = 0;
function generateId(): string {
  return `msg-${Date.now()}-${++idCounter}`;
}

interface UseChatOptions {
  messages?: Message[];
}

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(options.messages || []);
  const [status, setStatus] = useState<"ready" | "loading">("ready");

  const sendMessage = useCallback(
    async ({ text }: { text: string }) => {
      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content: text,
      };

      setMessages((prev) => [...prev, userMessage]);
      setStatus("loading");

      try {
        const allMessages = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: allMessages }),
        });

        if (!res.ok) {
          throw new Error(`Chat API returned ${res.status}`);
        }

        const data = await res.json();

        const assistantMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: data.reply || data.error || "No response",
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error("Chat error:", error);
        const errorMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: "Sorry, I couldn't process that. Please try again.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setStatus("ready");
      }
    },
    [messages]
  );

  return { messages, sendMessage, status, setMessages };
}
