import express, { Router } from 'express';
import { FuncionDatos } from '../controllers/TrenController.js';

const router = express.Router();
router.post('/datos', FuncionDatos);

export default router;