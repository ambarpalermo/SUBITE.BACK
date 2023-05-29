import express, { RequestHandler } from "express"
import { Request, Response } from "express";
import { prisma } from "./database/db.ts";
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

app.post('/hard', (req: Request, res: Response) => {
    console.log(req.body)
    console.log("recibido.hard")
    let {temp} = req.body
    console.log(temp)
    const dbResult = prisma.conexiones.update({
        where: {
            id: 1
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
    let {personas} = req.body
    console.log(personas)
    const dbResult = await prisma.conexiones.update({
        where: {
            id: 1,
          },
          data: {
              personas: personas,
          },
    })
    res.json({message: "hola juana"})
})

app.get('/IAdatos', async (req: Request, res: Response) =>{
    const dbResult = await prisma.conexiones.findMany(); 
    console.log(dbResult)
    res.json({message: "hola thiago", data: dbResult})
})

app.get('/IAdatos', (req, res) =>{
    //con.query select datos para thiago
})

//config-----------------------------------------------------------------------------------

app.listen(5000, () => {
    console.log('Server on port 5000');
});