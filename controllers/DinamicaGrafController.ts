import { Request, Response } from "express/index.ts";
import { prisma } from "../index.ts";
import { GraficoProps } from "../types.ts";


const FuncionDinamicaGraf = async (req: Request, res: Response) => {
    console.log(req.params)
    const dia = req.params.dia;
    const hora = req.params.hora;
}

export {FuncionDinamicaGraf};