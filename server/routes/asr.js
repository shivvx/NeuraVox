import express from "express";
import multer from "multer";
import { asrController } from "../controllers/asrController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Base64 ASR
router.post("/", asrController);

// File ASR
router.post("/file", upload.single("audio"), asrController);

export default router;
