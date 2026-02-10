"use client";

import type { UIMessage } from "ai";
import { getMessageText } from "@/lib/types";

const TOOL_LABELS: Record<string, string> = {
  webSearch: "Searching the web",
  listWorkflows: "Checking workflows",
  getWorkflow: "Reading workflow",
  activateWorkflow: "Activating workflow",
  deactivateWorkflow: "Deactivating workflow",
  executeWorkflow: "Running workflow",
  listExecutions: "Checking executions",
  getExecution: "Reading execution",
};

function getToolInfo(part: { type: string }): {
  toolCallId: string;
  toolName: string;
} | null {
  if (!part.type.startsWith("tool-")) return null;
  const toolName = part.type.slice(5); // strip "tool-" prefix
  const p = part as { type: string; toolCallId?: string };
  return { toolCallId: p.toolCallId || toolName, toolName };
}

interface MessageBubbleProps {
  message: UIMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const text = getMessageText(message);

  const toolInfos = message.parts
    .map(getToolInfo)
    .filter((info): info is NonNullable<typeof info> => info !== null);

  if (!text && toolInfos.length === 0) return null;

  return (
    <div
      className={`flex animate-message-in ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] ${
          isUser
            ? "bg-jarvis-user-bubble text-white rounded-[20px] rounded-br-[6px] px-4 py-2.5"
            : "space-y-2"
        }`}
      >
        {!isUser &&
          toolInfos.map((info) => (
            <div
              key={info.toolCallId}
              className="flex items-center gap-2 px-3 py-1.5 bg-jarvis-surface rounded-full text-xs text-jarvis-text-secondary w-fit"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-jarvis-accent animate-pulse" />
              {TOOL_LABELS[info.toolName] || info.toolName}
            </div>
          ))}
        {text && (
          <div
            className={
              isUser
                ? ""
                : "bg-jarvis-jarvis-bubble text-jarvis-text-primary rounded-[20px] rounded-bl-[6px] px-4 py-2.5"
            }
          >
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
              {text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
