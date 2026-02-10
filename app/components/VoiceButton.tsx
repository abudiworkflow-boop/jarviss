"use client";

interface VoiceButtonProps {
  isListening: boolean;
  isSupported: boolean;
  onStart: () => void;
  onStop: () => void;
}

export function VoiceButton({
  isListening,
  isSupported,
  onStart,
  onStop,
}: VoiceButtonProps) {
  if (!isSupported) {
    return (
      <p className="text-xs text-jarvis-text-secondary text-center px-4">
        Voice input not supported in this browser
      </p>
    );
  }

  return (
    <button
      type="button"
      onPointerDown={onStart}
      onPointerUp={onStop}
      onPointerLeave={onStop}
      className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-95 ${
        isListening
          ? "bg-red-500/20 ring-2 ring-red-500"
          : "bg-jarvis-surface hover:bg-jarvis-surface-light"
      }`}
    >
      {isListening && (
        <span className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse-ring" />
      )}
      <svg
        className={`w-7 h-7 relative z-10 ${
          isListening ? "text-red-500" : "text-jarvis-text-primary"
        }`}
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
  );
}
