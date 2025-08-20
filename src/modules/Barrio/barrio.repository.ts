import { apiClient } from '../../config/axios.config';
import { BarrioDTO, BarriosResponseDTO } from './interfaces';

export namespace BarrioRepository {
    export async function getBarrios(): Promise<BarrioDTO[]> {
        try {
            const response = await apiClient.get('/neighborhoods/');
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error obteniendo barrios');
        }
    }
}