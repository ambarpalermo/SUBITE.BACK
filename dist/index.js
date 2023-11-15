var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import IARouter from "./router/IaRouter.js";
import HARDRouter from "./router/HardRouter.js";
import TRENRouter from "./router/TrenRouter.js";
import DINAMICARouter from "./router/DinamicaRouter.js";
import GRAFICORouter from "./router/GraficoRouter.js";
import DINAMICAGRAFRouter from "./router/DinamicaGrafRouter.js";
const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
}));
const logger = (req, res, next) => {
    console.log(`Route Recieved: ${req.protocol}://${req.get("host")}${req.originalUrl}`);
    next();
};
app.use(logger);
app.use("/IA", IARouter);
app.use("/HARD", HARDRouter);
app.use("/TREN", TRENRouter);
app.use("/DINAMICA", DINAMICARouter);
app.use("/GRAFICO", GRAFICORouter);
app.use("/DINAMICAGRAFICO", DINAMICAGRAFRouter);
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
//SETUP ---------------------------------------------------------------------------------------------
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("la ruta tiene algo");
}));
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
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entre");
    const Tren1 = A[lugar % A.length];
    const Tren2 = A[(lugar + 2) % A.length];
    const Tren3 = A[(lugar + 4) % A.length];
    const Tren4 = A[(lugar + 6) % A.length];
    const Tren5 = A[(lugar + 8) % A.length];
    const Tren6 = A[(lugar + 10) % A.length];
    const dbConsult1 = yield prisma.estacion.findMany({
        where: {
            idLinea: 1,
            orden: lugar % A.length,
        },
    });
    const idEstacion = dbConsult1.map((est, index) => {
        const IDestacion = est.id;
        return IDestacion;
    });
    const dbResult1 = yield prisma.tren.update({
        where: {
            id: 1,
        },
        data: {
            idEstActual: idEstacion[0],
        },
    });
    //--------------------------------------------------------------------------------------------
    const dbConsult2 = yield prisma.estacion.findMany({
        where: {
            idLinea: 1,
            orden: (lugar + 2) % A.length,
        },
    });
    const idEstacion2 = dbConsult2.map((est, index) => {
        const IDestacion = est.id;
        return IDestacion;
    });
    const dbResult2 = yield prisma.tren.update({
        where: {
            id: 2,
        },
        data: {
            idEstActual: idEstacion2[0],
        },
    });
    //--------------------------------------------------------------------------------------------
    const dbConsult3 = yield prisma.estacion.findMany({
        where: {
            idLinea: 1,
            orden: (lugar + 4) % A.length,
        },
    });
    const idEstacion3 = dbConsult3.map((est, index) => {
        const IDestacion = est.id;
        return IDestacion;
    });
    const dbResult3 = yield prisma.tren.update({
        where: {
            id: 3,
        },
        data: {
            idEstActual: idEstacion3[0],
        },
    });
    //---------------------------------------------------------------------------------------
    const dbConsult4 = yield prisma.estacion.findMany({
        where: {
            idLinea: 1,
            orden: (lugar + 6) % A.length,
        },
    });
    const idEstacion4 = dbConsult4.map((est, index) => {
        const IDestacion = est.id;
        return IDestacion;
    });
    const dbResult4 = yield prisma.tren.update({
        where: {
            id: 4,
        },
        data: {
            idEstActual: idEstacion4[0],
        },
    });
    //------------------------------------------------------------------------------------------------
    const dbConsult5 = yield prisma.estacion.findMany({
        where: {
            idLinea: 1,
            orden: (lugar + 8) % A.length,
        },
    });
    const idEstacion5 = dbConsult5.map((est, index) => {
        const IDestacion = est.id;
        return IDestacion;
    });
    const dbResult5 = yield prisma.tren.update({
        where: {
            id: 5,
        },
        data: {
            idEstActual: idEstacion5[0],
        },
    });
    //------------------------------------------------------------------------------------------------
    const dbConsult6 = yield prisma.estacion.findMany({
        where: {
            idLinea: 1,
            orden: (lugar + 10) % A.length,
        },
    });
    const idEstacion6 = dbConsult6.map((est, index) => {
        const IDestacion = est.id;
        return IDestacion;
    });
    const dbResult6 = yield prisma.tren.update({
        where: {
            id: 6,
        },
        data: {
            idEstActual: idEstacion6[0],
        },
    });
    lugar += 1;
}), 30000);
export { lineasColor };
export const prisma = new PrismaClient();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLE9BQTJCLE1BQU0sU0FBUyxDQUFDO0FBRWxELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFFeEIsT0FBTyxRQUFRLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDaEQsT0FBTyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDaEQsT0FBTyxjQUFjLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxhQUFhLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxrQkFBa0IsTUFBTSxnQ0FBZ0MsQ0FBQTtBQUUvRCxNQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBRXZCLEdBQUcsQ0FBQyxHQUFHLENBQ0wsSUFBSSxDQUFDO0lBQ0gsTUFBTSxFQUFFLEdBQUc7Q0FDWixDQUFDLENBQ0gsQ0FBQztBQUNGLE1BQU0sTUFBTSxHQUFtQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FDVCxtQkFBbUIsR0FBRyxDQUFDLFFBQVEsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FDekUsQ0FBQztJQUNGLElBQUksRUFBRSxDQUFDO0FBQ1QsQ0FBQyxDQUFDO0FBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVoQixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN6QixHQUFHLENBQUMs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