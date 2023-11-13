import express, { Router } from 'express';
import { FuncionDatos } from '../controllers/TrenController.ts';

const router = express.Router();
router.post('/datos', FuncionDatos);

export default router;