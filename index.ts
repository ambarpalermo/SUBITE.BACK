import express, { RequestHandler } from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { Tren, Vagon } from "@prisma/client";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

const prisma = new PrismaClient();

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

interface TrenProps {
  id: number;
  idLinea: number;
  idEstActual: number;
  vagon: {
    id: number;
    personas: string;
    temp: number;
    hum: number;
    idTren: number;
  }[];
}

interface VagonHARDProps {
  temp: number;
  hum: number;
  idVagon: number;
  idTren: number;
}

interface VagonIAProps {
  personas: string;
  idVagon: number;
  idTren: number;
}

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

app.use(express.json());
app.use(logger);

//SETUP ---------------------------------------------------------------------------------------------
app.get("/", (req: Request, res: Response) => {
  res.send("la ruta tiene algo");
});

app.post("/hard", async (req: Request, res: Response) => {
  console.log(req.body);
  console.log("recibido.hard");
  let arrayVagonesHARD: VagonHARDProps[] = req.body;
  await Promise.all(
    arrayVagonesHARD.map(async (vagonHARD) => {
      const dbResult = await prisma.vagon.update({
        where: {
          id: vagonHARD.idVagon,
        },
        data: {
          temp: vagonHARD.temp,
          hum: vagonHARD.hum,
        },
      });
    })
  );
  res.json({ message: "hola kuki" });
});

app.post("/IA", async (req: Request, res: Response) => {
  console.log(req.body);
  console.log("recibido.IA");
  let arrayVagonesIA: VagonIAProps[] = req.body;
  await Promise.all(
    arrayVagonesIA.map(async (vagonIA) => {
      const dbResult = await prisma.vagon.update({
        where: {
          id: vagonIA.idVagon,
        },
        data: {
          personas: vagonIA.personas,
        },
      });
    })
  );
  res.json({ message: "hola MONA" });
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
});

//config-----------------------------------------------------------------------------------

app.listen(5000, () => {
  console.log("Server on port 5000");
});

// app.get("/vagon", async (req: Request, res: Response) =>{
//   const dbResult = await prisma.vagon.create({
//     data: {
//       id: 36,
//       personas: "yellow",
//       temp: 22,
//       hum: 38,
//       idTren: 6
//     }
//   });
// });
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

// app.get("/tren", async (req: Request, res: Response) => {
//   const dbResult = await prisma.tren.create({
//     data: {
//       id: 6,
//       idLinea: 1,
//       idEstActual: 0
//     },
//   });
// })

const A = [
  "PlazaDeMayo",
  "Peru",
  "Piedras",
  "Lima",
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
  const Tren4 = A[(lugar + 6) % A.length];
  const Tren5 = A[(lugar + 8) % A.length];
  const Tren6 = A[(lugar + 10) % A.length];

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
  //---------------------------------------------------------------------------------------
  const dbConsult4 = await prisma.estacion.findMany({
    where: {
      idLinea: 1,
      orden: (lugar + 6) % A.length,
    },
  });

  const idEstacion4 = dbConsult4.map((est, index) => {
    const IDestacion = est.id;
    return IDestacion;
  });

  const dbResult4 = await prisma.tren.update({
    where: {
      id: 4,
    },
    data: {
      idEstActual: idEstacion4[0],
    },
  });
  //------------------------------------------------------------------------------------------------
  const dbConsult5 = await prisma.estacion.findMany({
    where: {
      idLinea: 1,
      orden: (lugar + 8) % A.length,
    },
  });

  const idEstacion5 = dbConsult5.map((est, index) => {
    const IDestacion = est.id;
    return IDestacion;
  });

  const dbResult5 = await prisma.tren.update({
    where: {
      id: 5,
    },
    data: {
      idEstActual: idEstacion5[0],
    },
  });
  //------------------------------------------------------------------------------------------------
  const dbConsult6 = await prisma.estacion.findMany({
    where: {
      idLinea: 1,
      orden: (lugar + 10) % A.length,
    },
  });

  const idEstacion6 = dbConsult6.map((est, index) => {
    const IDestacion = est.id;
    return IDestacion;
  });

  const dbResult6 = await prisma.tren.update({
    where: {
      id: 6,
    },
    data: {
      idEstActual: idEstacion6[0],
    },
  });

  lugar += 1;
}, 10000);
