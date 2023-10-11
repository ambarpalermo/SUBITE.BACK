import express, { Router } from 'express';
import { FuncionHard } from '../controllers/HardController.ts';

export const HARDRouter = express.Router();
const router: Router = express.Router();

router.post('/hard', FuncionHard);