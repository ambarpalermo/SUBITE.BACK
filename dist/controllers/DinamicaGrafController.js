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
const FuncionDinamicaGraf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const diaRecibido = req.params.dia;
    const idLinea = parseInt(req.params.idLinea);
    const horaRecibida = parseInt(req.params.hora);
    const estaciones = yield prisma.estacion.findMany({
        where: {
            idLinea: idLinea
        },
        select: {
            id: true,
            nombre: true
        }
    });
    const dbResult = yield prisma.grafico.groupBy({
        by: ['idEstGraf'],
        where: {
            fecha: diaRecibido,
            hora: horaRecibida
        },
        _avg: {
            personas: true
        }
    });
    const result = dbResult.map((nombre) => {
        let nombreEstacion = "";
        estaciones.map((estacion) => {
            if (estacion.id === nombre.idEstGraf) {
                nombreEstacion = estacion.nombre;
            }
        });
        return { average: nombre._avg.personas, nombreEstacion };
    });
    console.log(result);
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
});
export { FuncionDinamicaGraf };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGluYW1pY2FHcmFmQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL0RpbmFtaWNhR3JhZkNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUlyQyxNQUFNLG1CQUFtQixHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZCLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ25DLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRS9DLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDOUMsS0FBSyxFQUFFO1lBQ0gsT0FBTyxFQUFFLE9BQU87U0FDbkI7UUFDRCxNQUFNLEVBQUU7WUFDSixFQUFFLEVBQUUsSUFBSTtZQUNSLE1BQU0sRUFBRSxJQUFJO1NBQ2Y7S0FDSixDQUFDLENBQUM7SUFFSCxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQzFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUNqQixLQUFLLEVBQUU7WUFDTCxLQUFLLEVBQUUsV0FBVztZQUNsQixJQUFJLEVBQUUsWUFBWTtTQUNuQjtRQUNELElBQUksRUFBRTtZQUNGLFFBQVEsRUFBRSxJQUFJO1NBQ2pCO0tBQ0osQ0FBQyxDQUFBO0lBRUYsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ25DLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN4QixVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDeEIsSUFBSSxRQUFRLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xDLGNBQWMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO2FBQ3BDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxDQUFBO0lBQzVELENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLENBQUMsQ0FBQztJQUVwRCx5Q0FBeUM7SUFDekMsa0RBQWtEO0lBRWxELG9EQUFvRDtJQUNwRCxrQ0FBa0M7SUFFbEMsb0RBQW9EO0lBQ3BELG1CQUFtQjtJQUNuQixrQ0FBa0M7SUFDbEMsYUFBYTtJQUNiLFVBQVU7SUFDVixzREFBc0Q7SUFDdEQsbUJBQW1CO0lBQ25CLGlDQUFpQztJQUNqQyxhQUFhO0lBQ2IsWUFBWTtJQUNaLDBCQUEwQjtJQUMxQixLQUFLO0FBRVQsQ0FBQyxDQUFBLENBQUE7QUFFRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsQ0FBQyJ9