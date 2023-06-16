import express, { RequestHandler } from "express"
import { Request, Response } from "express";
import {prisma} from "./database/db.ts";
import cors from "cors";

//console.log(prisma);

const app = express();
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

const logger: RequestHandler = (req, res, next) => {
    console.log(`Route Recieved: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}


app.use(express.json());
app.use(logger);

//SETUP ---------------------------------------------------------------------------------------------

app.post('/hard', async(req: Request, res: Response) => {
    console.log(req.body)
    console.log("recibido.hard")
    let {temp, idVagon, idTren} = req.body
    console.log(temp)
    const dbResult = await prisma.vagon.update({
        where: {
            id: idVagon,
          },
          data: {
              temp: temp
          }
    })
    res.json({message: "hola kuki"})
})

app.post('/IA', async(req: Request, res: Response ) => {
    console.log(req.body)
    console.log("recibido.IA")
    let {personas, idVagon, idTren} = req.body
    console.log(personas)
    const dbResult = await prisma.vagon.update({
        where: {
            id: idVagon,
          },
          data: {
              personas: personas,
          },
    })
    res.json({message: "hola juana"})
})

app.post('/datos', (req: Request, res: Response) =>{
    console.log(req.body)
    let {linea, estacion, terminal} = req.body
    
})

app.get('/IAdatos', async (req: Request, res: Response) =>{
    const dbResult = await prisma.vagon.findMany({
        where: {
            idTren: 1 
        }
    }); 
    res.header('Access-Control-Allow-Origin', '*');
    console.log(dbResult)
    res.json(dbResult)
})

app.post("/estaciones/:linea", async (req: Request, res: Response) => {
    const idlinea = req.body
    const dbResult = await prisma.estacion.findMany({
        where: {
            idLinea: idlinea
        }
    });
    console.log(dbResult)
})


//config-----------------------------------------------------------------------------------

app.listen(5000, () => {
    console.log('Server on port 5000');
});

//crear base de datos

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


