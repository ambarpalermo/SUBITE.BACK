import express, { RequestHandler } from "express"
import { Request, Response } from "express";
import { prisma } from "./database/db.ts";
import cors from "cors";

//console.log(prisma);

const app = express();
app.use(cors());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     next();
// });

const logger: RequestHandler = (req, res, next) => {
    console.log(`Route Recieved: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

const lineasColor = [
    {
        id: "A",
        color: "#24b4bfff"        
    },
    {
        id: "B",
        color: "#bf2424ff" 
    },
    {
        id: "C",
        color: "#084e64ff" 
    },
    {
        id: "D",
        color: "#086432ff" 
    },
    {
        id: "E",
        color: "#4c0457ff" 
    },
    {
        id: "H",
        color: "#c8b727ff" 
    }
]

app.use(express.json());
app.use(logger);

//SETUP ---------------------------------------------------------------------------------------------

app.post('/hard', async (req: Request, res: Response) => {
    console.log(req.body)
    console.log("recibido.hard")
    let { temp, idVagon, idTren } = req.body
    console.log(temp)
    const dbResult = await prisma.vagon.update({
        where: {
            id: idVagon,
        },
        data: {
            temp: temp
        }
    })
    res.json({ message: "hola kuki" })
})

app.post('/IA', async (req: Request, res: Response) => {
    console.log(req.body)
    console.log("recibido.IA")
    let { personas, idVagon, idTren } = req.body
    console.log(personas)
    const dbResult = await prisma.vagon.update({
        where: {
            id: idVagon,
        },
        data: {
            personas: personas,
        },
    })
    res.json({ message: "hola juana" })
})


app.get('/IAdatos', async (req: Request, res: Response) => {
    const dbResult = await prisma.vagon.findMany({
        where: {
            idTren: 1
        }
    });
    console.log(dbResult)
    res.json(dbResult)
    //res.header('Access-Control-Allow-Origin', '*');
})

app.post("/linea/:id/estaciones", async (req: Request, res: Response) => {
    const nomLinea = req.params.id
    const linea = await prisma.linea.findFirst({
        where: {
            letra: nomLinea
        }
    });
    const dbResult = await prisma.estacion.findMany({
        where: {
            idLinea: linea?.id
        }
    });
    const terminales = dbResult.map((item,index) =>{
        const terminal1 = item.orden === 0 ? item.nombre : null
        const terminal2 = item.orden === Math.ceil(dbResult.length / 2 - 1) ? item.nombre : null
        Math.ceil(dbResult.length / 2)
        const arr = [terminal1, terminal2] 
        return arr 
    })
    const lineaFound = lineasColor.find((letter) => letter.id === nomLinea)
    if(lineaFound){
        const color = lineaFound.color
        console.log(color)
        console.log(Math.ceil(dbResult.length / 2))
        console.log(terminales)
        res.json({terminales: terminales, result: dbResult, color: color})
    } 
    //res.header('Access-Control-Allow-Origin', '*');
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

//crear el update de estacion actual


const A = ["PlazaDeMayo", "Peru", "Piedras", "SaezPeña", "Congreso", "Pasco", "Alberti", "PlazaMiserere", "Loria", "CastroBarros", "RioDeJaneiro", "Acoyte", "PrimeraJunta", "Carabobo", "Flores", "SanPedrito"]

let lugar = 0
setInterval(async() => {
    console.log("entre")
        const Tren1 = A[lugar % A.length] 
        const Tren2 = A[(lugar + 2) % A.length]
        const Tren3 = A[(lugar + 4) % A.length]

        const dbResult = await prisma.tren.update({
            where: {
                id: 100
            },
            data: {
                idEstActual: lugar % A.length
            },
        })
        
        const dbResult1 = await prisma.tren.update({
            where: {
                id: 101
            },
            data: {
                idEstActual: (lugar + 2) % A.length
            },
        })
        
        const dbResult2 = await prisma.tren.update({
            where: {
                id: 102
            },
            data: {
                idEstActual: (lugar + 4) % A.length
            },
        })
        lugar += 1
    }, 
    10000);
