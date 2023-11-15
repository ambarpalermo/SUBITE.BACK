import express, { Response, Router } from "express";
import { FuncionDinamicaGraf } from "../controllers/DinamicaGrafController.js";
const router = express.Router();

router.post("/dinamicaGraf/:dia/:hora/:idLinea", FuncionDinamicaGraf);

export default router;