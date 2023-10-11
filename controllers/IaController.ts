import {VagonIAProps} from "../types.ts";
import {Request, Response} from "express/index.ts";
import {prisma} from "../index.ts";

const FuncionIA = async (req: Request, res: Response) => {
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
};

export {FuncionIA};