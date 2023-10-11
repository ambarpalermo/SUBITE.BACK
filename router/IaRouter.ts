import express, { Router } from 'express';
import { FuncionIA } from '../controllers/IaController.ts';

export const IARouter = express.Router();
const router: Router = express.Router();

router.post('/IA', FuncionIA);