import { Request, Response } from "express/index.js";
import { prisma } from "../index.js";
import { GraficoProps } from "../types.js";

const FuncionGrafico = async (req: Request, res: Response) => {
  console.log("recibido.Grafico");
  let DatosGrafico: GraficoProps[] = req.body;
  console.log(DatosGrafico);

  DatosGrafico.forEach(async (tren) => {
    const dbResult = await prisma.tren.findFirst({
      where: {
        id: tren.idTren,
      },
    });
    
    const guardarDatosDB = await prisma.grafico.create({
      data: {
        personas: tren.personas,
        color: tren.color,
        dia: tren.dia,
        hora: tren.hora,
        fecha: tren.fecha,
        idEstGraf: dbResult!.idEstActual,
      },
    });
  });

  res.json({ message: "respuesta create GRAFICO" });
};

export { FuncionGrafico };
