var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from "../index.js";
const FuncionGrafico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("recibido.Grafico");
    let DatosGrafico = req.body;
    console.log(DatosGrafico);
    const dbResult = yield prisma.tren.findFirst({
        where: {
            id: DatosGrafico.idTren,
        },
    });
    console.log(dbResult);
    const guardarDatosDB = yield prisma.grafico.create({
        data: {
            personas: DatosGrafico.personas,
            color: DatosGrafico.color,
            dia: DatosGrafico.dia,
            hora: DatosGrafico.hora,
            fecha: DatosGrafico.fecha,
            idEstGraf: dbResult.idEstActual
        }
    });
});
export { FuncionGrafico };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JhZmljb0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy9HcmFmaWNvQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3JDLE1BQU0sY0FBYyxHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNoQyxJQUFJLFlBQVksR0FBaUIsR0FBRyxDQUFDLElBQUksQ0FBQztJQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFCLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDM0MsS0FBSyxFQUFFO1lBQ0wsRUFBRSxFQUFFLFlBQVksQ0FBQyxNQUFNO1NBQ3hCO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV0QixNQUFNLGNBQWMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2pELElBQUksRUFBQztZQUNELFFBQVEsRUFBRSxZQUFZLENBQUMsUUFBUTtZQUMvQixLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUs7WUFDekIsR0FBRyxFQUFFLFlBQVksQ0FBQyxHQUFHO1lBQ3JCLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSTtZQUN2QixLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUs7WUFDekIsU0FBUyxFQUFFLFFBQVMsQ0FBQyxXQUFXO1NBQ25DO0tBQ0YsQ0FBQyxDQUFBO0FBRUosQ0FBQyxDQUFBLENBQUM7QUFFRixPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMifQ==