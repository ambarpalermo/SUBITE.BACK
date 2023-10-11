import { EstacionesProps, TrenProps, } from "../types.ts";
import { Tren, Vagon } from "@prisma/client";
import {Request, Response} from "express/index.ts";
import {prisma} from "../index.ts";

async function TrenMasCercano(ests: EstacionesProps[]) {
    const TodosLosTrenes = await prisma.tren.findMany({
      include: {
        vagon: true,
      },
    });
    //console.log(TodosLosTrenes)
  
    let tren: (Tren & { vagon: Vagon[] }) | undefined;
  
    const vagonesTren = ests.map((estacion) => {
      //console.log("Buscando tren en la estacion: " + estacion.id);
  
      tren = TodosLosTrenes.find((t) => estacion.id === t.idEstActual);
  
      if (!tren) console.log("no se encontro");
      return tren as TrenProps;
    });
    return vagonesTren;
}


const FuncionDatos = async (req: Request, res: Response) => {
    let { NomLinea, Estacion, Terminal } = req.body;
    console.log(req.body);
    const linea = await prisma.linea.findFirst({
      where: {
        letra: NomLinea,
      },
    });
    const dbResult = await prisma.estacion.findMany({
      where: {
        idLinea: linea?.id,
        terminal: Terminal,
      },
    });
    //el sort ordena el array, fijandose el el orden de A menos el orden de B y asi se fija cual va primero segun el resultado
  
    const arrEstacionesOrdenadas = [] as EstacionesProps[];
  
    dbResult.sort(function (a, b) {
      return a.orden - b.orden;
    });
  
    // Recorrer el array ordenado y agregar los nombres al nuevo array
    dbResult.map((_, index) => {
      if (dbResult.length > index)
        arrEstacionesOrdenadas.push({
          id: dbResult[index].id,
          nombre: dbResult[index].nombre,
          orden: dbResult[index].orden.toString(),
        });
    });
  
    const corte = arrEstacionesOrdenadas.find((item) => item.nombre === Estacion);
  
    const corteIndex = arrEstacionesOrdenadas.indexOf(corte!);
  
    let respuestaTren = [] as Vagon[][];
  
    let ests = [] as EstacionesProps[];
  
    if (arrEstacionesOrdenadas.indexOf(Terminal) === 0) {
      ests = arrEstacionesOrdenadas.slice(
        corteIndex + 1,
        arrEstacionesOrdenadas.length
      );
    }
    //el reverse te da vuelta el orden para que sea de la estacion del usuario para atras
    else {
      ests = arrEstacionesOrdenadas.slice(0, corteIndex + 1).reverse();
    }
    const INFO = await TrenMasCercano(ests);
    const filteredTren = INFO.filter((tren) => tren !== undefined);
  
    const filteredVagonesTren = filteredTren.map((tren) => {
      return tren.vagon;
    });
    //console.log("Tren filtrado:) ", filteredTren)
    console.log(filteredVagonesTren);
    return res.json(filteredVagonesTren);
};

export {FuncionDatos};