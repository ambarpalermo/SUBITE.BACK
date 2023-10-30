import express, { Router } from 'express';
import { FuncionIA } from '../controllers/IaController.ts';

const router = express.Router();
router.post('/ia', FuncionIA);

export default router;