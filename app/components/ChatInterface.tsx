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

  const handleSend = useCallback(() => {
    if (input.trim()) {
      sendMessage({ text: input.trim() });
      setInput("");
    }
  }, [input, sendMessage]);

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
        <div className="w-8 h-8 rounded-full border-2 border-jarvis-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        isActive={isActive}
        isListening={isListening}
        isSpeaking={isSpeaking}
      />
      <ChatMessages messages={messages} isActive={isActive} />
      <ChatInput
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
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
