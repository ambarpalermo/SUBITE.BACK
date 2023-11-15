import express, { Router } from 'express';
import { FuncionIA } from '../controllers/IaController.js';

const router = express.Router();
router.post('/ia', FuncionIA);

export default router;