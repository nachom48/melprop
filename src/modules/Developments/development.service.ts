import { DevelopmentRepository } from './development.repository';
import { Development, DevelopmentResponse } from './interfaces/development.interface';

export namespace DevelopmentService {
    /**
     * Obtener developments por etapa
     */
    export async function getDevelopmentsByStage(stage: string, limit: number = 3): Promise<Development[]> {
        try {
            console.log('🏗️ Service - Buscando developments por etapa:', stage);

            const response = await DevelopmentRepository.searchDevelopments({
                stage: stage,
                limit: limit,
                order_by: 'mayorPrecio'
            });

            console.log(`✅ Service - Developments de etapa "${stage}" obtenidos:`, response.objects.length);
            console.log(`🔍 Service - Response completa:`, response);

            // ⚠️ IMPORTANTE: El backend no está aplicando el limit correctamente
            // Está devolviendo todos los developments en lugar de solo 'limit'
            // Por eso aplicamos el límite manualmente en el frontend
            const limitedDevelopments = response.objects.slice(0, limit);
            console.log(`✂️ Service - Developments limitados a ${limit}:`, limitedDevelopments.length);
            console.log(`⚠️ Service - Backend devolvió ${response.objects.length} pero limitamos a ${limit}`);

            return limitedDevelopments;
        } catch (error: any) {
            console.error(`❌ Service - Error obteniendo developments de etapa "${stage}":`, error);
            throw error;
        }
    }

    /**
 * Obtener los mejores developments de cada etapa
 */
    export async function getBestDevelopmentsByStages(): Promise<{
        'En Pozo': Development[];
        'En Construcción': Development[];
        'Finalizado': Development[];
    }> {
        try {
            console.log('🏗️ Service - Obteniendo mejores developments por etapa');

            // Mapear nombres de etapas a valores del backend
            const stageMapping = {
                'En Pozo': 'en-pozo',
                'En Construcción': 'en-construccion',
                'Finalizado': 'finalizado'
            };

            const developmentsByStage: any = {};

            // Buscar los 3 developments más caros de cada etapa
            for (const [displayStage, backendStage] of Object.entries(stageMapping)) {
                try {
                    const developments = await getDevelopmentsByStage(backendStage, 3);
                    developmentsByStage[displayStage] = developments;
                    console.log(`🏗️ Developments de etapa "${displayStage}":`, developments.length);
                } catch (err: any) {
                    console.error(`❌ Error obteniendo developments de etapa "${displayStage}":`, err);
                    developmentsByStage[displayStage] = []; // Array vacío si falla
                }
            }

            return developmentsByStage;
        } catch (error: any) {
            console.error('❌ Service - Error general obteniendo developments:', error);
            throw error;
        }
    }

    /**
     * Obtener todos los developments disponibles
     */
    export async function getAllDevelopments(): Promise<Development[]> {
        try {
            console.log('🏗️ Service - Obteniendo todos los developments');

            const response = await DevelopmentRepository.searchDevelopments({
                limit: 100 // Obtener más para tener variedad
            });

            console.log('✅ Service - Developments obtenidos:', response.objects.length);
            return response.objects;
        } catch (error: any) {
            console.error('❌ Service - Error obteniendo developments:', error);
            throw error;
        }
    }
}
