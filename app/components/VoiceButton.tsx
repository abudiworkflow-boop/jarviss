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
      className={`relative flex items-center justify-center transition-all duration-200 active:scale-95 ${
        isListening
          ? "w-[72px] h-[72px] rounded-2xl bg-jarvis-error/20 ring-2 ring-jarvis-error glow-red"
          : "w-[72px] h-[72px] rounded-2xl bg-jarvis-surface/80 border border-white/[0.06] hover:bg-jarvis-surface-light hover:border-jarvis-accent/30"
      }`}
    >
      {isListening && (
        <>
          <span className="absolute inset-0 rounded-2xl bg-jarvis-error/10 animate-pulse-ring" />
          <span className="absolute inset-[-8px] rounded-3xl border border-jarvis-error/20 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
        </>
      )}
      <svg
        className={`w-7 h-7 relative z-10 transition-colors ${
          isListening ? "text-jarvis-error" : "text-jarvis-text-primary"
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
