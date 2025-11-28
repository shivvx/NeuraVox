import { askAI } from '../utils/chat.js';
import { transcribeAudio } from '../utils/deepgram.js';
import { generateSpeech } from '../utils/murf.js';

export const pipelineController = async (req, res) => {
  try {
    const { audio } = req.body;
    if (!audio) {
      return res.status(400).json({ error: 'Audio is required' });
    }
    // Transcribe audio to text
    const transcription = await transcribeAudio(audio);
    // Get AI response
    const aiResponse = await askAI(transcription);
    // Generate speech from AI response
    const speechAudio = await generateSpeech(aiResponse);
    res.json({ transcription, aiResponse, speechAudio });
  } catch (error) {
    console.error('Error in pipelineController:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
