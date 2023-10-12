import {Request, Response} from "express/index.ts";
import {prisma} from "../index.ts";
import {lineasColor} from "../index.ts";

const FuncionDinamica = async (req: Request, res: Response) => {
  console.log("entre");
  const nomLinea = req.params.id;
  const linea = await prisma.linea.findFirst({
    where: {
      letra: nomLinea,
    },
  });
  const dbResult = await prisma.estacion.findMany({
    where: {
      idLinea: linea?.id,
    },
  });
  const arr = dbResult.map((item, index) => {
    dbResult.sort((a, b) => a.orden - b.orden);
  });
  const terminales = dbResult.map((item, index) => {
    const terminal1 = item.orden === 0 ? item.nombre : null;
    const terminal2 =
      item.orden === Math.ceil(dbResult.length / 2 - 1) ? item.nombre : null;
    Math.ceil(dbResult.length / 2);
    const arr = [terminal1, terminal2];
    return arr;
  });
  const lineaFound = lineasColor.find((letter) => letter.id === nomLinea);
  if (lineaFound) {
    const color = lineaFound.color;
    console.log(color);
    console.log(Math.ceil(dbResult.length / 2));
    console.log(terminales);
    res.json({ terminales: terminales, result: dbResult, color: color });
  }
};

export {FuncionDinamica};