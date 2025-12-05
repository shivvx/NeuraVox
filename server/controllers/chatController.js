import { askAI } from '../utils/chat.js';

export const chatController = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    const reply = await askAI(text);
    res.json({ reply });
  } catch (error) {
    console.error('Error in chatController:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
