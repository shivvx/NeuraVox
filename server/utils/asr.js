// utils/asr.js
import { createClient } from "@deepgram/sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load config.json manually (Node 24 safe)
const configPath = path.join(__dirname, "../config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

// Initialize Deepgram Client
const deepgram = createClient(config.DEEPGRAM_API_KEY);

/* -----------------------------
   MIME TYPE DETECTOR
------------------------------*/
function detectMimeType(filePath, fallback = "audio/wav") {
  const ext = filePath.toLowerCase();

  if (ext.endsWith(".wav")) return "audio/wav";
  if (ext.endsWith(".mp3")) return "audio/mpeg";
  if (ext.endsWith(".m4a")) return "audio/mp4";
  if (ext.endsWith(".aac")) return "audio/aac";
  if (ext.endsWith(".ogg")) return "audio/ogg";
  if (ext.endsWith(".opus")) return "audio/opus";

  return fallback;
}

/* -----------------------------
   BASE64 TRANSCRIPTION
------------------------------*/
export async function transcribeBase64(base64Audio, mimeType = "audio/wav") {
  try {
    const buffer = Buffer.from(base64Audio, "base64");

    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      buffer,
      {
        model: 'nova-2',
        smart_format: true,
        mimetype: mimeType,
      }
    );

    if (error) {
      console.error('Deepgram Base64 Error:', error);
      return null;
    }

    return result.results.channels[0].alternatives[0].transcript || "";
  } catch (error) {
    console.error("Deepgram Base64 Error:", error);
    return null;
  }
}

/* -----------------------------
   FILE TRANSCRIPTION
------------------------------*/
export async function transcribeFile(filePath, originalMime) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error("❌ File does not exist:", filePath);
      return null;
    }

    const audioBuffer = fs.readFileSync(filePath);
    const mimeType = originalMime || detectMimeType(filePath);

    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      audioBuffer,
      {
        model: 'nova-2',
        smart_format: true,
        mimetype: mimeType,
      }
    );

    try {
      fs.unlinkSync(filePath);
    } catch (cleanupErr) {
      console.warn("File cleanup failed:", cleanupErr);
    }

    if (error) {
      console.error('Deepgram File Error:', error);
      return null;
    }

    return result.results.channels[0].alternatives[0].transcript || "";
  } catch (error) {
    console.error("Deepgram File ASR Error:", error);
    return null;
  }
}
