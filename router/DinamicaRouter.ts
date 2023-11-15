import express, { Response, Router } from "express";
import { FuncionDinamica } from "../controllers/DinamicaController.js";
const router = express.Router();

router.post("/linea/:id/estaciones", FuncionDinamica);

export default router;