import express, { RequestHandler } from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

import IARouter from "./router/IaRouter.ts";
import HARDRouter from "./router/HardRouter.ts";
import TRENRouter from "./router/TrenRouter.ts";
import DINAMICARouter from "./router/DinamicaRouter.ts";
import GRAFICORouter from "./router/GraficoRouter.ts";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use("/IA", IARouter);
app.use("/HARD", HARDRouter);
app.use("/TREN", TRENRouter);
app.use("/DINAMICA", DINAMICARouter);
app.use("/GRAFICO", GRAFICORouter);

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

app.use(express.json());
app.use(logger);

//SETUP ---------------------------------------------------------------------------------------------
app.get("/", (req: Request, res: Response) => {
  res.send("la ruta tiene algo");
});

//config-----------------------------------------------------------------------------------

app.listen(9000, () => {
  console.log("Server on port 9000");
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
}, 30000);

export { lineasColor };
export const prisma = new PrismaClient();