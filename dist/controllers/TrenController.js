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
//funcion que devuelve el tren mas cercano a la estacion del usuario
function TrenMasCercano(ests) {
    return __awaiter(this, void 0, void 0, function* () {
        const TodosLosTrenes = yield prisma.tren.findMany({
            include: {
                vagon: true,
            },
        });
        //console.log(TodosLosTrenes)
        let tren;
        const vagonesTren = ests.map((estacion) => {
            //console.log("Buscando tren en la estacion: " + estacion.id);
            tren = TodosLosTrenes.find((t) => estacion.id === t.idEstActual);
            if (!tren)
                console.log("no se encontro");
            return tren;
        });
        return vagonesTren;
    });
}
//funcion que devuelve los datos del vagon
const FuncionDatos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { NomLinea, Estacion, Terminal } = req.body;
    console.log(req.body);
    const linea = yield prisma.linea.findFirst({
        where: {
            letra: NomLinea,
        },
    });
    const dbResult = yield prisma.estacion.findMany({
        where: {
            idLinea: linea === null || linea === void 0 ? void 0 : linea.id,
            terminal: Terminal,
        },
    });
    //el sort ordena el array, fijandose el el orden de A menos el orden de B y asi se fija cual va primero segun el resultado
    const arrEstacionesOrdenadas = [];
    dbResult.sort(function (a, b) {
        return a.orden - b.orden;
    });
    // Recorrer el array ordenado y agregar los nombres al nuevo array
    dbResult.map((_, index) => {
        if (dbResult.length > index)
            arrEstacionesOrdenadas.push({
                id: dbResult[index].id,
                nombre: dbResult[index].nombre,
                orden: dbResult[index].orden.toString(),
            });
    });
    const corte = arrEstacionesOrdenadas.find((item) => item.nombre === Estacion);
    const corteIndex = arrEstacionesOrdenadas.indexOf(corte);
    let respuestaTren = [];
    let ests = [];
    if (arrEstacionesOrdenadas.indexOf(Terminal) === 0) {
        ests = arrEstacionesOrdenadas.slice(corteIndex + 1, arrEstacionesOrdenadas.length);
    }
    //el reverse te da vuelta el orden para que sea de la estacion del usuario para atras
    else {
        ests = arrEstacionesOrdenadas.slice(0, corteIndex + 1).reverse();
    }
    const INFO = yield TrenMasCercano(ests);
    const filteredTren = INFO.filter((tren) => tren !== undefined);
    const filteredVagonesTren = filteredTren.map((tren) => {
        return tren.vagon;
    });
    //console.log("Tren filtrado:) ", filteredTren)
    console.log(filteredVagonesTren);
    return res.json(filteredVagonesTren);
});
export { FuncionDatos };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlbkNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy9UcmVuQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRW5DLG9FQUFvRTtBQUNwRSxTQUFlLGNBQWMsQ0FBQyxJQUF1Qjs7UUFDakQsTUFBTSxjQUFjLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNoRCxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGLENBQUMsQ0FBQztRQUNILDZCQUE2QjtRQUU3QixJQUFJLElBQTZDLENBQUM7UUFFbEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3hDLDhEQUE4RDtZQUU5RCxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sSUFBaUIsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7Q0FBQTtBQUVELDBDQUEwQztBQUMxQyxNQUFNLFlBQVksR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUN2RCxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLE1BQU0sS0FBSyxHQUFHLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDekMsS0FBSyxFQUFFO1lBQ0wsS0FBSyxFQUFFLFFBQVE7U0FDaEI7S0FDRixDQUFDLENBQUM7SUFDSCxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQzlDLEtBQUssRUFBRTtZQUNMLE9BQU8sRUFBRSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsRUFBRTtZQUNsQixRQUFRLEVBQUUsUUFBUTtTQUNuQjtLQUNGLENBQUMsQ0FBQztJQUNILDBIQUEwSDtJQUUxSCxNQUFNLHNCQUFzQixHQUFHLEVBQXVCLENBQUM7SUFFdkQsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0lBRUgsa0VBQWtFO0lBQ2xFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDeEIsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUs7WUFDekIsc0JBQXNCLENBQUMsSUFBSSxDQUFDO2dCQUMxQixFQUFFLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RCLE1BQU0sRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTTtnQkFDOUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO2FBQ3hDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxLQUFLLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDO0lBRTlFLE1BQU0sVUFBVSxHQUFHLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxLQUFNLENBQUMsQ0FBQztJQUUxRCxJQUFJLGFBQWEsR0FBRyxFQUFlLENBQUM7SUFFcEMsSUFBSSxJQUFJLEdBQUcsRUFBdUIsQ0FBQztJQUVuQyxJQUFJLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbEQsSUFBSSxHQUFHLHNCQUFzQixDQUFDLEtBQUssQ0FDakMsVUFBVSxHQUFHLENBQUMsRUFDZCxzQkFBc0IsQ0FBQyxNQUFNLENBQzlCLENBQUM7S0FDSDtJQUNELHFGQUFxRjtTQUNoRjtRQUNILElBQUksR0FBRyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNsRTtJQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQztJQUUvRCxNQUFNLG1CQUFtQixHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNwRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDSCwrQ0FBK0M7SUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2pDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3pDLENBQUMsQ0FBQSxDQUFDO0FBRUYsT0FBTyxFQUFDLFlBQVksRUFBQyxDQUFDIn0=