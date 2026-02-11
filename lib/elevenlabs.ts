import type { ElevenLabsConfig } from "./types";

export const DEFAULT_VOICE_ID = "nzFihrBIvB34imQBuxub";

export const DEFAULT_CONFIG: ElevenLabsConfig = {
  voiceId: DEFAULT_VOICE_ID,
  modelId: "eleven_flash_v2_5",
  stability: 0.5,
  similarityBoost: 0.75,
  outputFormat: "mp3_22050_32",
};
