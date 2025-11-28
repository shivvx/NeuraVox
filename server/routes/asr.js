import express from 'express';
import { asrController } from '../controllers/asrController.js';

const router = express.Router();

router.post('/', asrController);

export default router;
