import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jarvis: {
          bg: "#000000",
          surface: "#1C1C1E",
          "surface-light": "#2C2C2E",
          "surface-lighter": "#3A3A3C",
          accent: "#0A84FF",
          "accent-light": "#5AC8FA",
          "user-bubble": "#0A84FF",
          "jarvis-bubble": "#1C1C1E",
          "text-primary": "#FFFFFF",
          "text-secondary": "#8E8E93",
          border: "#38383A",
          success: "#30D158",
          warning: "#FF9F0A",
          error: "#FF453A",
        },
      },
      animation: {
        "message-in": "messageIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-ring": "pulseRing 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "typing-dot": "typingDot 1.4s infinite ease-in-out",
        "fade-in": "fadeIn 0.3s ease-out",
        "fade-up": "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 0.2s ease-out",
        "voice-pulse": "voicePulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        messageIn: {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        pulseRing: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.2)" },
        },
        typingDot: {
          "0%, 80%, 100%": { transform: "scale(0.4)", opacity: "0.4" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        voicePulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.08)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
