import { BarrioRepository } from "./barrio.repository";
import { BarrioDTO } from "./interfaces";

export namespace BarrioService {
    export async function getBarrios(): Promise<BarrioDTO[]> {
        try {
            return await BarrioRepository.getBarrios();
        } catch (error: any) {
            console.error('Error en BarrioService.getBarrios:', error);
            throw error; // Re-lanzar el error para que el componente lo maneje
        }
    }


}