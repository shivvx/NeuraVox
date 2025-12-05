import { transcribeBase64, transcribeFile } from "../utils/asr.js";
import { generateSpeech } from "../utils/tts.js";

export const asrController = async (req, res) => {
  try {
    console.log("📥 ASR Request Received");
    console.log("Base64:", !!req.body.audioBase64);
    console.log("File:", req.file);

    // CASE 1: Base64 speech
    if (req.body.audioBase64) {
      const transcript = await transcribeBase64(
        req.body.audioBase64,
        req.body.mimetype || "audio/wav"
      );

      let audio = null;
      try {
        audio = await generateSpeech(transcript || "Unable to transcribe audio.");
      } catch (ttsError) {
        console.error("TTS generation failed:", ttsError);
        // Continue without audio - transcription is still available
      }

      return res.json({
        source: "base64",
        transcription: transcript || "Unable to transcribe audio.",
        audio: audio
      });
    }

    // CASE 2: File upload
    if (req.file) {
      const transcript = await transcribeFile(
        req.file.path,
        req.file.mimetype
      );

      let audio = null;
      try {
        audio = await generateSpeech(transcript || "Unable to transcribe audio.");
      } catch (ttsError) {
        console.error("TTS generation failed:", ttsError);
        // Continue without audio - transcription is still available
      }

      return res.json({
        source: "file",
        transcription: transcript || "Unable to transcribe audio.",
        audio: audio
      });
    }

    res.status(400).json({
      error: "No audio provided! Send base64 or upload a file."
    });
  } catch (err) {
    console.error("ASR Controller Error:", err);
    res.status(500).json({ error: "ASR processing failed." });
  }
};
