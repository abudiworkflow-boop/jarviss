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
          accent: "#0A84FF",
          "user-bubble": "#0A84FF",
          "jarvis-bubble": "#1C1C1E",
          "text-primary": "#FFFFFF",
          "text-secondary": "#8E8E93",
          border: "#38383A",
        },
      },
      animation: {
        "message-in": "messageIn 0.3s ease-out",
        "pulse-ring": "pulseRing 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "typing-dot": "typingDot 1.4s infinite ease-in-out",
        "fade-in": "fadeIn 0.2s ease-out",
      },
      keyframes: {
        messageIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseRing: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.15)" },
        },
        typingDot: {
          "0%, 80%, 100%": { transform: "scale(0)" },
          "40%": { transform: "scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
