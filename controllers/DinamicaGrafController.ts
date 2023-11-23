import { Request, Response } from "express/index.js";
import { prisma } from "../index.js";
import { GraficoProps } from "../types.js";


const FuncionDinamicaGraf = async (req: Request, res: Response) => {
    console.log(req.params)
    const diaRecibido = req.params.dia;
    const idLinea = parseInt(req.params.idLinea);
    const horaRecibida = parseInt(req.params.hora);

    const estaciones = await prisma.estacion.findMany({
        where: {
            idLinea: idLinea
        },
        select: {
            id: true,
            nombre: true
        }
    });

    const dbResult = await prisma.grafico.groupBy({
        by: ['idEstGraf'],
        where: {
          fecha: diaRecibido,
          hora: horaRecibida
        },
        _avg: {
            personas: true
        }
    })

    const result = dbResult.map((nombre) => {
        let nombreEstacion = ""; 
        estaciones.map((estacion) => {
            if (estacion.id === nombre.idEstGraf) {
                nombreEstacion = estacion.nombre;
            }
        })

        return { average: nombre._avg.personas, nombreEstacion }
    })

    console.log(result)
    

    //COMO PASAR LOS ID DE ESTACION A NOMBRES
    // const AVRG = dbResult.find((avrg) => avrg._avg)

    // const IDest = dbResult.map(async (item, data) =>{
    //     console.log(item.idEstGraf)
        
    //     const Est = await prisma.estacion.findFirst({
    //         where: {
    //             id: item.idEstGraf,
    //         },
    //     });
    //     const nomEst = await prisma.estacion.findMany({
    //         where: {
    //           nombre: Est?.nombre,
    //         },
    //       });
    //     console.log(nomEst)
    // })

}

export {FuncionDinamicaGraf};