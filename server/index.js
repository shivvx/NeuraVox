import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import chatRoutes from './routes/chat.js';
import asrRoutes from './routes/asr.js';
import ttsRoutes from './routes/tts.js';
import pipelineRoutes from './routes/pipeline.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('NeuraVox Backend Running');
});

app.use('/api/ai', chatRoutes);
app.use('/api/asr', asrRoutes);
app.use('/api/tts', ttsRoutes);
app.use('/api/pipeline', pipelineRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
