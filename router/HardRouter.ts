import express, { Router } from 'express';
import { FuncionHard } from '../controllers/HardController.js';

const router = express.Router();
router.post('/hard', FuncionHard);

export default router;