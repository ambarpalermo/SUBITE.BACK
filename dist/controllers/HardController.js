var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const FuncionHard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
export { FuncionHard };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGFyZENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy9IYXJkQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQSxNQUFNLFdBQVcsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV0Qiw0Q0FBNEM7SUFFNUMsZ0NBQWdDO0lBQ2hDLGlEQUFpRDtJQUNqRCxxQkFBcUI7SUFDckIsZ0RBQWdEO0lBQ2hELG1EQUFtRDtJQUNuRCxpQkFBaUI7SUFDakIsaUNBQWlDO0lBQ2pDLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsZ0NBQWdDO0lBQ2hDLDhCQUE4QjtJQUM5QixXQUFXO0lBQ1gsVUFBVTtJQUNWLE9BQU87SUFDUCxLQUFLO0lBRUwsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQSxDQUFDO0FBRUYsT0FBTyxFQUFDLFdBQVcsRUFBQyxDQUFDIn0=