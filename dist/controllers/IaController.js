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
const FuncionIA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    console.log("recibido.IA");
    let arrayVagonesIA = req.body;
    yield Promise.all(arrayVagonesIA.map((vagonIA) => __awaiter(void 0, void 0, void 0, function* () {
        const dbResult = yield prisma.vagon.update({
            where: {
                id: vagonIA.idVagon,
            },
            data: {
                personas: vagonIA.personas,
            },
        });
    })));
    res.json({ message: "hola MONA" });
});
export { FuncionIA };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWFDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvSWFDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFbkMsTUFBTSxTQUFTLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzQixJQUFJLGNBQWMsR0FBbUIsR0FBRyxDQUFDLElBQUksQ0FBQztJQUM5QyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2YsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDekMsS0FBSyxFQUFFO2dCQUNMLEVBQUUsRUFBRSxPQUFPLENBQUMsT0FBTzthQUNwQjtZQUNELElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7YUFDM0I7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUEsQ0FBQyxDQUNILENBQUM7SUFDRixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFBLENBQUM7QUFFRixPQUFPLEVBQUMsU0FBUyxFQUFDLENBQUMifQ==