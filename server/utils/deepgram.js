import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createClient } from '@deepgram/sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const configPath = join(__dirname, '../config.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));

const deepgram = createClient(config.DEEPGRAM_API_KEY);

export async function transcribeAudio(audioBuffer) {
  try {
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      audioBuffer,
      {
        model: 'nova-2',
        smart_format: true,
        mimetype: 'audio/wav',
      }
    );

    if (error) {
      console.error('Deepgram error:', error);
      throw new Error('Failed to transcribe audio');
    }

    return result.results.channels[0].alternatives[0].transcript;
  } catch (error) {
    console.error('Error in transcribeAudio:', error);
    throw new Error('Failed to transcribe audio');
  }
}
