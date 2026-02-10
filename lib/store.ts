import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppState } from "./types";

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      voiceState: {
        isListening: false,
        isSpeaking: false,
        voiceMode: false,
        transcript: "",
      },
      setVoiceState: (partial) =>
        set((state) => ({
          voiceState: { ...state.voiceState, ...partial },
        })),

      sessionMessages: [],
      setSessionMessages: (messages) => set({ sessionMessages: messages }),

      autoSpeak: true,
      setAutoSpeak: (value) => set({ autoSpeak: value }),

      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "jarvis-storage",
      partialize: (state) => ({
        sessionMessages: state.sessionMessages,
        autoSpeak: state.autoSpeak,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
