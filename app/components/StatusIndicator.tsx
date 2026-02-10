"use client";

interface StatusIndicatorProps {
  isActive: boolean;
  isListening: boolean;
  isSpeaking: boolean;
}

export function StatusIndicator({
  isActive,
  isListening,
  isSpeaking,
}: StatusIndicatorProps) {
  let label = "";
  let dotColor = "";

  if (isListening) {
    label = "Listening...";
    dotColor = "bg-red-500";
  } else if (isActive) {
    label = "Thinking...";
    dotColor = "bg-jarvis-accent";
  } else if (isSpeaking) {
    label = "Speaking...";
    dotColor = "bg-green-500";
  }

  if (!label) return null;

  return (
    <div className="flex items-center gap-2 animate-fade-in">
      <span
        className={`w-2 h-2 rounded-full ${dotColor} animate-pulse-ring`}
      />
      <span className="text-xs text-jarvis-text-secondary">{label}</span>
    </div>
  );
}
