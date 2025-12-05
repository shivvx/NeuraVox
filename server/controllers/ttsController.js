import { generateSpeech } from "../utils/tts.js";

export const ttsController = async (req, res) => {
  try {
    const { text, voiceId, returnBase64 } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const audio = await generateSpeech(text, voiceId, returnBase64);

    if (!audio) {
      return res.status(500).json({ error: 'Failed to generate speech' });
    }

    res.json({
      audio: audio,
      format: returnBase64 ? 'base64' : 'url'
    });
  } catch (error) {
    console.error('Error in ttsController:', error);
    res.status(500).json({ error: 'Failed to process TTS request' });
  }
};
