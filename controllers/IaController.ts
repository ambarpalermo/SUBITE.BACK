import {VagonIAProps} from "../types.js";
import {Request, Response} from "express/index.js";
import {prisma} from "../index.js";

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