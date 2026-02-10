export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

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
  sessionMessages: Message[];
  setSessionMessages: (messages: Message[]) => void;

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

export function getMessageText(message: Message): string {
  return message.content;
}
