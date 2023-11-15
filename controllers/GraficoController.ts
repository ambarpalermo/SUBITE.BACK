import { Request, Response } from "express/index.js";
import { prisma } from "../index.js";
import { GraficoProps } from "../types.js";

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
        fecha: DatosGrafico.fecha,
        idEstGraf: dbResult!.idEstActual
    }
  })

};

export { FuncionGrafico };
