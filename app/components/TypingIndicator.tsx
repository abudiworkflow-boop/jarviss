"use client";

export function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-jarvis-surface/80 border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full bg-jarvis-accent animate-typing-dot"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-jarvis-accent animate-typing-dot"
            style={{ animationDelay: "0.2s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-jarvis-accent animate-typing-dot"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </div>
  );
}
