import express, { Response, Router } from "express";
import { FuncionGrafico } from "../controllers/GraficoController.ts";
const router = express.Router();

router.post("/grafico", FuncionGrafico);

export default router;