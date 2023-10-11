import express, { Router } from 'express';
import { FuncionDatos } from '../controllers/TrenController.ts';
export const TRENRouter = express.Router();

const router: Router = express.Router();

router.post('/datos', FuncionDatos);