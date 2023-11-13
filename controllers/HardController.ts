import {VagonHARDProps} from "../types.ts";
import {Request, Response} from "express/index.ts";
import {prisma} from "../index.ts";

const FuncionHard = async (req: Request, res: Response) => {
    console.log(req.body);

    // const body = await? JSON.parse(req.body);

    // console.log("recibido.hard");
    // let arrayVagonesHARD: VagonHARDProps[] = body;
    // await Promise.all(
    //   arrayVagonesHARD.map(async (vagonHARD) => {
    //     const dbResult = await prisma.vagon.update({
    //       where: {
    //         id: vagonHARD.idVagon,
    //       },
    //       data: {
    //         temp: vagonHARD.temp,
    //         hum: vagonHARD.hum,
    //       },
    //     });
    //   })
    // );

    res.json({ message: "hola kuki" });
  };

  export {FuncionHard};