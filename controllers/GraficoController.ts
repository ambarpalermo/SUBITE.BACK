import {Request, Response} from "express/index.ts";
import {prisma} from "../index.ts";
import {GraficoProps} from "../types.ts"

const FuncionGrafico = async (req: Request, res: Response) => {
    console.log(req.body);
    console.log("recibido.Grafico");
    let arrayDatosGrafico: GraficoProps[] = req.body;
    await Promise.all(
        arrayDatosGrafico.map(async (datos) => {
            const dbResult = await prisma.tren.findFirst({
                where: {
                    id: datos.idTren,
                }
            });
            console.log(dbResult)
        })
    );
}

export {FuncionGrafico};