import { Request, Response } from "express/index.ts";
import { prisma } from "../index.ts";
import { GraficoProps } from "../types.ts";

const FuncionGrafico = async (req: Request, res: Response) => {
  console.log("recibido.Grafico");
  let DatosGrafico: GraficoProps = req.body;
  console.log(DatosGrafico);
  const dbResult = await prisma.tren.findFirst({
    where: {
      id: DatosGrafico.idTren,
    },
  });
  console.log(dbResult);

  const guardarDatosDB = await prisma.grafico.create({
    data:{
        personas: DatosGrafico.personas,
        color: DatosGrafico.color,
        dia: DatosGrafico.dia,
        hora: DatosGrafico.hora,
        idEstGraf: dbResult!.idEstActual
    }
  })
};

export { FuncionGrafico };
