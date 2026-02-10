"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { useAppStore } from "@/lib/store";
import { useVoiceInput } from "@/lib/hooks/use-voice-input";
import { useVoiceOutput } from "@/lib/hooks/use-voice-output";
import { getMessageText } from "@/lib/types";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export function ChatInterface() {
  const {
    voiceState,
    setVoiceState,
    sessionMessages,
    setSessionMessages,
    autoSpeak,
    hasHydrated,
  } = useAppStore();

  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    messages: hasHydrated ? sessionMessages : [],
  });

  const { startListening, stopListening, isListening, transcript, isSupported } =
    useVoiceInput();
  const { speak, stop: stopSpeaking, isSpeaking } = useVoiceOutput();

  const isActive = status === "submitted" || status === "streaming";
  const prevStatusRef = useRef(status);

  // Sync messages to Zustand for persistence
  useEffect(() => {
    if (messages.length > 0) {
      setSessionMessages(messages);
    }
  }, [messages, setSessionMessages]);

  // Update voice state in store
  useEffect(() => {
    setVoiceState({ isListening, isSpeaking });
  }, [isListening, isSpeaking, setVoiceState]);

  // Auto-speak when assistant response completes
  useEffect(() => {
    const wasActive =
      prevStatusRef.current === "submitted" ||
      prevStatusRef.current === "streaming";

    if (
      wasActive &&
      status === "ready" &&
      voiceState.voiceMode &&
      autoSpeak &&
      messages.length > 0
    ) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        const text = getMessageText(lastMessage);
        if (text) speak(text);
      }
    }
    prevStatusRef.current = status;
  }, [status, messages, voiceState.voiceMode, autoSpeak, speak]);

  const handleSend = useCallback(
    (text?: string) => {
      const msg = text || input.trim();
      if (msg) {
        sendMessage({ text: msg });
        setInput("");
      }
    },
    [input, sendMessage]
  );

  const handleVoiceStart = useCallback(() => {
    stopSpeaking();
    startListening((text: string) => {
      if (text.trim()) {
        sendMessage({ text });
      }
    });
  }, [startListening, stopSpeaking, sendMessage]);

  const handleVoiceStop = useCallback(() => {
    stopListening();
  }, [stopListening]);

  // Submit transcript when voice recognition ends with text
  useEffect(() => {
    if (!isListening && transcript.trim()) {
      sendMessage({ text: transcript });
    }
  }, [isListening, transcript, sendMessage]);

  const toggleVoiceMode = useCallback(() => {
    setVoiceState({ voiceMode: !voiceState.voiceMode });
    if (voiceState.voiceMode) {
      stopSpeaking();
    }
  }, [voiceState.voiceMode, setVoiceState, stopSpeaking]);

  if (!hasHydrated) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-jarvis-accent to-jarvis-accent-light flex items-center justify-center animate-voice-pulse">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      <ChatHeader
        isActive={isActive}
        isListening={isListening}
        isSpeaking={isSpeaking}
      />
      <ChatMessages
        messages={messages}
        isActive={isActive}
        onSuggestionClick={handleSend}
      />
      <ChatInput
        input={input}
        onInputChange={setInput}
        onSend={() => handleSend()}
        isActive={isActive}
        voiceMode={voiceState.voiceMode}
        onToggleVoice={toggleVoiceMode}
        isListening={isListening}
        isVoiceSupported={isSupported}
        onVoiceStart={handleVoiceStart}
        onVoiceStop={handleVoiceStop}
      />
    </div>
  );
}
