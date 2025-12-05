import { readFileSync } from 'fs';
import { transcribeAudio } from './server/utils/deepgram.js';

async function testDeepgram() {
  try {
    // Use the buuur2.mp3 file for testing
    const audioPath = './buuur2.mp3';
    const audioBuffer = readFileSync(audioPath);

    console.log('Testing Deepgram transcription with buuur2.mp3...');
    const transcription = await transcribeAudio(audioBuffer);
    console.log('Transcription result:', transcription);
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testDeepgram();
