"use client";

import type { UIMessage } from "ai";
import { getMessageText } from "@/lib/types";

const TOOL_LABELS: Record<string, { label: string; icon: string }> = {
  webSearch: { label: "Searching the web", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" },
  listWorkflows: { label: "Checking workflows", icon: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" },
  getWorkflow: { label: "Reading workflow", icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" },
  activateWorkflow: { label: "Activating workflow", icon: "M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" },
  deactivateWorkflow: { label: "Deactivating workflow", icon: "M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" },
  executeWorkflow: { label: "Running workflow", icon: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" },
  listExecutions: { label: "Checking executions", icon: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" },
  getExecution: { label: "Reading execution", icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" },
};

function getToolInfo(part: { type: string }): {
  toolCallId: string;
  toolName: string;
} | null {
  if (!part.type.startsWith("tool-")) return null;
  const toolName = part.type.slice(5);
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
            ? "bg-gradient-to-br from-jarvis-accent to-blue-600 text-white rounded-2xl rounded-br-md px-4 py-2.5 shadow-lg shadow-jarvis-accent/10"
            : "space-y-2"
        }`}
      >
        {!isUser &&
          toolInfos.map((info) => {
            const toolMeta = TOOL_LABELS[info.toolName];
            return (
              <div
                key={info.toolCallId}
                className="flex items-center gap-2 px-3 py-1.5 bg-jarvis-surface/80 border border-white/[0.06] rounded-full text-xs text-jarvis-text-secondary w-fit animate-scale-in"
              >
                <svg className="w-3 h-3 text-jarvis-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={toolMeta?.icon || "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"} />
                </svg>
                <span>{toolMeta?.label || info.toolName}</span>
                <div className="w-1 h-1 rounded-full bg-jarvis-accent animate-pulse" />
              </div>
            );
          })}
        {text && (
          <div
            className={
              isUser
                ? ""
                : "bg-jarvis-surface/80 border border-white/[0.06] text-jarvis-text-primary rounded-2xl rounded-bl-md px-4 py-2.5"
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
