import express, { Response, Router } from "express";
import { FuncionDinamica } from "../controllers/DinamicaController.ts";
const router = express.Router();

router.post("/linea/:id/estaciones", FuncionDinamica);

export default router;