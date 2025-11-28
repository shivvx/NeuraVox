import { transcribeAudio } from '../utils/deepgram.js';

export const asrController = async (req, res) => {
  try {
    const { audio } = req.body; // Assuming audio is base64 or file
    if (!audio) {
      return res.status(400).json({ error: 'Audio is required' });
    }
    const transcription = await transcribeAudio(audio);
    res.json({ transcription });
  } catch (error) {
    console.error('Error in asrController:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};