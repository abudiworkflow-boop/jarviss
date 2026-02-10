import type { UIMessage } from "ai";

export interface VoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  voiceMode: boolean;
  transcript: string;
}

export interface AppState {
  // Voice
  voiceState: VoiceState;
  setVoiceState: (partial: Partial<VoiceState>) => void;

  // Session
  sessionMessages: UIMessage[];
  setSessionMessages: (messages: UIMessage[]) => void;

  // Settings
  autoSpeak: boolean;
  setAutoSpeak: (value: boolean) => void;

  // Hydration
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export interface ElevenLabsConfig {
  voiceId: string;
  modelId: string;
  stability: number;
  similarityBoost: number;
  outputFormat: string;
}

/** Extract text content from a UIMessage's parts */
export function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}
