import express, { Response, Router } from "express";
import { FuncionGrafico } from "../controllers/GraficoController.js";
const router = express.Router();

router.post("/grafico", FuncionGrafico);

export default router;