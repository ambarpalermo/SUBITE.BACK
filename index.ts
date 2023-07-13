import express, { RequestHandler } from "express";
import { Request, Response } from "express";
import { prisma } from "./database/db.ts";
import cors from "cors";
import { Tren, Vagon } from "@prisma/client";

const app = express();
app.use(cors());

const logger: RequestHandler = (req, res, next) => {
  console.log(
    `Route Recieved: ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

const lineasColor = [
  {
    id: "A",
    color: "#24b4bfff",
  },
  {
    id: "B",
    color: "#bf2424ff",
  },
  {
    id: "C",
    color: "#084e64ff",
  },
  {
    id: "D",
    color: "#086432ff",
  },
  {
    id: "E",
    color: "#4c0457ff",
  },
  {
    id: "H",
    color: "#c8b727ff",
  },
];
interface EstacionesProps {
  id: number;
  nombre: string;
  orden: string;
}

async function TrenMasCercano(ests: EstacionesProps[]) {
  console.log(ests);
  const TodosLosTrenes = await prisma.tren.findMany({
    include: {
      vagon: true,
    },
  });
  console.log(TodosLosTrenes)

  let tren: Tren & { vagon: Vagon[]; } | undefined;

  ests.map(async (estacion) => {
      console.log("Buscando tren en la estacion: " + estacion.id);
      
      tren = TodosLosTrenes.find((t) => {
      return estacion.id === t.idEstActual;
      });
      
      if(!tren) console.log("AAAAAAAAAAAAA");
      return tren;
  });
  return tren;
}

app.use(express.json());
app.use(logger);

//SETUP ---------------------------------------------------------------------------------------------

app.post("/hard", async (req: Request, res: Response) => {
  console.log(req.body);
  console.log("recibido.hard");
  let { temp, idVagon, idTren } = req.body;
  console.log(temp);
  const dbResult = await prisma.vagon.update({
    where: {
      id: idVagon,
    },
    data: {
      temp: temp,
    },
  });
  res.json({ message: "hola kuki" });
});

app.post("/IA", async (req: Request, res: Response) => {
  console.log(req.body);
  console.log("recibido.IA");
  let { personas, idVagon, idTren } = req.body;
  console.log(personas);
  const dbResult = await prisma.vagon.update({
    where: {
      id: idVagon,
    },
    data: {
      personas: personas,
    },
  });
  res.json({ message: "hola juana" });
});

app.get("/IAdatos", async (req: Request, res: Response) => {
  const dbResult = await prisma.vagon.findMany({
    where: {
      idTren: 1,
    },
  });
  console.log(dbResult);
  res.json(dbResult);
});

app.post("/linea/:id/estaciones", async (req: Request, res: Response) => {
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
    dbResult.sort(function (a, b) {
      return a.orden - b.orden;
    });
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
});

app.post("/datos", async (req: Request, res: Response) => {
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

  if (arrEstacionesOrdenadas.indexOf(Terminal) === 0) {
    const ests = arrEstacionesOrdenadas.slice(
      corteIndex + 1,
      arrEstacionesOrdenadas.length
    );
    const INFO = await TrenMasCercano(ests);
    console.log(INFO);
  }
  //el reverse te da vuelta el orden para que sea de la estacion del usuario para atras
  else {
    const ests = arrEstacionesOrdenadas.slice(0, corteIndex + 1).reverse();
    const INFO = await TrenMasCercano(ests);
    console.log(INFO);
  }
});

//config-----------------------------------------------------------------------------------

app.listen(5000, () => {
  console.log("Server on port 5000");
});

//creacion de base de datos

// const estaciones = ["Hospitales", "ParquePatricios", "Caseros", "Inclan", "Humberto", "Venezuela", "Once", "Corrientes", "Cordoba", "SantaFe", "LasHeras", "FacultadDeDerecho"]

// const terminales = ["Hospitales", "FacultadDeDerecho"]

// estaciones.map(async (est, index) => {
//     terminales.map(async (ter, index2) => {
//         await prisma.estacion.create({
//             data: {
//                 nombre: est,
//                 terminal: ter,
//                 orden: index,
//                 idLinea: 6,
//              }
//          })
//      })
//  })

//creacion del update de la estacion actual

const A = [
  "PlazaDeMayo",
  "Peru",
  "Piedras",
  "SaezPeña",
  "Congreso",
  "Pasco",
  "Alberti",
  "PlazaMiserere",
  "Loria",
  "CastroBarros",
  "RioDeJaneiro",
  "Acoyte",
  "PrimeraJunta",
  "Carabobo",
  "Flores",
  "SanPedrito",
];

let lugar = 0;
setInterval(async () => {
  console.log("entre");
  const Tren1 = A[lugar % A.length];
  const Tren2 = A[(lugar + 2) % A.length];
  const Tren3 = A[(lugar + 4) % A.length];

  const dbConsult1 = await prisma.estacion.findMany({
    where: {
      idLinea: 1,
      orden: lugar % A.length,
    },
  });

  const idEstacion = dbConsult1.map((est, index) => {
    const IDestacion = est.id;
    return IDestacion;
  });

  const dbResult1 = await prisma.tren.update({
    where: {
      id: 1,
    },
    data: {
      idEstActual: idEstacion[0],
    },
  });
  //--------------------------------------------------------------------------------------------
  const dbConsult2 = await prisma.estacion.findMany({
    where: {
      idLinea: 1,
      orden: (lugar + 2) % A.length,
    },
  });

  const idEstacion2 = dbConsult2.map((est, index) => {
    const IDestacion = est.id;
    return IDestacion;
  });

  const dbResult2 = await prisma.tren.update({
    where: {
      id: 2,
    },
    data: {
      idEstActual: idEstacion2[0],
    },
  });
  //--------------------------------------------------------------------------------------------
  const dbConsult3 = await prisma.estacion.findMany({
    where: {
      idLinea: 1,
      orden: (lugar + 4) % A.length,
    },
  });

  const idEstacion3 = dbConsult3.map((est, index) => {
    const IDestacion = est.id;
    return IDestacion;
  });

  const dbResult3 = await prisma.tren.update({
    where: {
      id: 3,
    },
    data: {
      idEstActual: idEstacion3[0],
    },
  });

  lugar += 1;
}, 10000);
