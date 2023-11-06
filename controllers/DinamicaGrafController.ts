import { Request, Response } from "express/index.ts";
import { prisma } from "../index.ts";
import { GraficoProps } from "../types.ts";


const FuncionDinamicaGraf = async (req: Request, res: Response) => {
    console.log(req.params)
    const diaRecibido = req.params.dia;
    const horaRecibida = parseInt(req.params.hora);
    const dbResult = await prisma.grafico.groupBy({
        by: ['idEstGraf'],
        where: {
          dia: diaRecibido,
          hora: horaRecibida
        },
        _avg:{
            personas: true
        }

    })
    console.log(dbResult)
    res.json({ message: "respuesta promedio GRAFICO" });

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