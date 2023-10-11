import express, { Router } from 'express';
import { FuncionDinamica } from '../controllers/DinamicaController.ts';
export const DINAMICARouter = express.Router();

const router: Router = express.Router();

router.post('/linea/:id/estaciones', FuncionDinamica);