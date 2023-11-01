import express, { Response, Router } from "express";
import { FuncionDinamicaGraf } from "../controllers/DinamicaGrafController.ts";
const router = express.Router();

router.post("/dinamicaGraf/:dia/:hora", FuncionDinamicaGraf);

export default router;