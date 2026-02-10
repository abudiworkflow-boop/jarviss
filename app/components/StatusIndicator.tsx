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
  let label = "Online";
  let dotColor = "bg-jarvis-success";
  let glowClass = "";

  if (isListening) {
    label = "Listening...";
    dotColor = "bg-jarvis-error";
    glowClass = "glow-red";
  } else if (isActive) {
    label = "Thinking...";
    dotColor = "bg-jarvis-accent";
    glowClass = "glow-blue";
  } else if (isSpeaking) {
    label = "Speaking...";
    dotColor = "bg-jarvis-success";
  }

  return (
    <div className="flex items-center gap-1.5 animate-fade-in">
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotColor} ${glowClass} ${
          isActive || isListening ? "animate-pulse" : ""
        }`}
      />
      <span className="text-[11px] text-jarvis-text-secondary font-medium">{label}</span>
    </div>
  );
}
