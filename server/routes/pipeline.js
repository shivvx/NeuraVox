import express from 'express';
import { pipelineController } from '../controllers/pipelineController.js';

const router = express.Router();

router.post('/', pipelineController);

export default router;
