// =====================================================
// SAVED SEARCHES MODULE - SERVICE LAYER
// =====================================================

import { savedSearchesRepository } from './SavedSearchesRepository';
import {
    CreateSavedSearchDTO,
    UpdateSavedSearchDTO,
    RemoveSavedSearchDTO,
    SavedSearchesResponseDTO,
    CreateSavedSearchResponseDTO,
    UpdateSavedSearchResponseDTO,
    RemoveSavedSearchResponseDTO,
    SavedSearchDTO,
    AlertType
} from './SavedSearches.dto';

export class SavedSearchesService {

    // =====================================================
    // SAVED SEARCHES METHODS
    // =====================================================

    /**
     * Crear nueva búsqueda guardada
     */
    async createSavedSearch(searchData: CreateSavedSearchDTO): Promise<CreateSavedSearchResponseDTO> {
        try {
            const response = await savedSearchesRepository.createSavedSearch(searchData);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de búsquedas guardadas - crear: ${error.message}`);
        }
    }

    /**
     * Obtener lista de búsquedas guardadas del usuario
     */
    async getSavedSearches(): Promise<SavedSearchesResponseDTO> {
        try {
            const response = await savedSearchesRepository.getSavedSearches();
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de búsquedas guardadas - obtener: ${error.message}`);
        }
    }

    /**
     * Actualizar búsqueda guardada existente
     */
    async updateSavedSearch(searchData: UpdateSavedSearchDTO): Promise<UpdateSavedSearchResponseDTO> {
        try {
            const response = await savedSearchesRepository.updateSavedSearch(searchData);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de búsquedas guardadas - actualizar: ${error.message}`);
        }
    }

    /**
     * Remover búsqueda guardada específica
     */
    async removeSavedSearch(searchData: RemoveSavedSearchDTO): Promise<RemoveSavedSearchResponseDTO> {
        try {
            const response = await savedSearchesRepository.removeSavedSearch(searchData);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de búsquedas guardadas - remover: ${error.message}`);
        }
    }

    /**
     * Obtener búsquedas guardadas por tipo de alerta
     */
    async getSavedSearchesByAlertType(alertType: AlertType): Promise<SavedSearchesResponseDTO> {
        try {
            const response = await savedSearchesRepository.getSavedSearchesByAlertType(alertType);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de búsquedas guardadas - filtrar por tipo: ${error.message}`);
        }
    }

    /**
     * Obtener cantidad de búsquedas guardadas
     */
    async getSavedSearchesCount(): Promise<number> {
        try {
            const count = await savedSearchesRepository.getSavedSearchesCount();
            return count;
        } catch (error: any) {
            console.error('Error obteniendo cantidad de búsquedas guardadas:', error);
            return 0;
        }
    }

    /**
     * Verificar si una URL ya está guardada
     */
    async isUrlAlreadySaved(url: string): Promise<boolean> {
        try {
            const isSaved = await savedSearchesRepository.isUrlAlreadySaved(url);
            return isSaved;
        } catch (error: any) {
            console.error('Error verificando si la URL ya está guardada:', error);
            return false;
        }
    }

    /**
     * Obtener búsquedas guardadas recientes
     */
    async getRecentSavedSearches(limit: number = 5): Promise<SavedSearchesResponseDTO> {
        try {
            const response = await savedSearchesRepository.getRecentSavedSearches(limit);
            return response;
        } catch (error: any) {
            throw new Error(`Error en el servicio de búsquedas guardadas - obtener recientes: ${error.message}`);
        }
    }

    // =====================================================
    // UTILITY METHODS
    // =====================================================

    /**
     * Crear búsqueda guardada con validación
     */
    async createSavedSearchWithValidation(searchData: CreateSavedSearchDTO): Promise<CreateSavedSearchResponseDTO> {
        try {
            // Validar que la URL no esté ya guardada
            const isAlreadySaved = await this.isUrlAlreadySaved(searchData.url);
            if (isAlreadySaved) {
                throw new Error('Esta búsqueda ya está guardada');
            }

            // Validar datos requeridos
            if (!searchData.name || !searchData.alert_type || !searchData.url) {
                throw new Error('Todos los campos son requeridos');
            }

            // Validar tipo de alerta
            const validAlertTypes: AlertType[] = ['email', 'sms', 'push', 'all'];
            if (!validAlertTypes.includes(searchData.alert_type as AlertType)) {
                throw new Error('Tipo de alerta inválido');
            }

            // Crear la búsqueda guardada
            const response = await this.createSavedSearch(searchData);
            return response;
        } catch (error: any) {
            throw new Error(`Error en validación y creación: ${error.message}`);
        }
    }

    /**
     * Obtener búsquedas guardadas con paginación
     */
    async getSavedSearchesPaginated(page: number = 1, limit: number = 10): Promise<{
        searches: SavedSearchDTO[];
        total: number;
        page: number;
        totalPages: number;
    }> {
        try {
            const allSearches = await this.getSavedSearches();
            const total = allSearches.searchs.length;
            const totalPages = Math.ceil(total / limit);
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;

            const paginatedSearches = allSearches.searchs.slice(startIndex, endIndex);

            return {
                searches: paginatedSearches,
                total,
                page,
                totalPages
            };
        } catch (error: any) {
            throw new Error(`Error obteniendo búsquedas paginadas: ${error.message}`);
        }
    }

    /**
     * Buscar en búsquedas guardadas por nombre
     */
    async searchInSavedSearches(searchTerm: string): Promise<SavedSearchDTO[]> {
        try {
            const searches = await this.getSavedSearches();
            const searchLower = searchTerm.toLowerCase();

            return searches.searchs.filter(search =>
                search.name.toLowerCase().includes(searchLower) ||
                search.url.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } catch (error: any) {
            throw new Error(`Error buscando en búsquedas guardadas: ${error.message}`);
        }
    }

    /**
     * Obtener estadísticas de búsquedas guardadas
     */
    async getSavedSearchesStats(): Promise<{
        total: number;
        byAlertType: Record<AlertType, number>;
        byDate: Record<string, number>;
        mostUsed: { name: string; count: number }[];
    }> {
        try {
            const searches = await this.getSavedSearches();
            const searchList = searches.searchs;

            const byAlertType: Record<AlertType, number> = {
                email: 0,
                sms: 0,
                push: 0,
                all: 0
            };

            const byDate: Record<string, number> = {};
            const nameCount: Record<string, number> = {};

            searchList.forEach(search => {
                // Contar por tipo de alerta
                byAlertType[search.alert_type as AlertType] =
                    (byAlertType[search.alert_type as AlertType] || 0) + 1;

                // Contar por fecha de creación (mes/año)
                const date = new Date(search.created_at);
                const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
                byDate[monthYear] = (byDate[monthYear] || 0) + 1;

                // Contar por nombre
                nameCount[search.name] = (nameCount[search.name] || 0) + 1;
            });

            // Obtener los nombres más usados
            const mostUsed = Object.entries(nameCount)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);

            return {
                total: searchList.length,
                byAlertType,
                byDate,
                mostUsed
            };
        } catch (error: any) {
            throw new Error(`Error obteniendo estadísticas de búsquedas guardadas: ${error.message}`);
        }
    }

    /**
     * Duplicar búsqueda guardada existente
     */
    async duplicateSavedSearch(searchId: number, newName?: string): Promise<CreateSavedSearchResponseDTO> {
        try {
            const searches = await this.getSavedSearches();
            const originalSearch = searches.searchs.find(search => search.id === searchId);

            if (!originalSearch) {
                throw new Error('Búsqueda no encontrada');
            }

            const duplicatedSearch: CreateSavedSearchDTO = {
                name: newName || `${originalSearch.name} (copia)`,
                alert_type: originalSearch.alert_type,
                url: originalSearch.url
            };

            const response = await this.createSavedSearch(duplicatedSearch);
            return response;
        } catch (error: any) {
            throw new Error(`Error duplicando búsqueda guardada: ${error.message}`);
        }
    }

    /**
     * Exportar búsquedas guardadas
     */
    async exportSavedSearches(format: 'json' | 'csv' = 'json'): Promise<string> {
        try {
            const searches = await this.getSavedSearches();

            if (format === 'json') {
                return JSON.stringify(searches.searchs, null, 2);
            } else if (format === 'csv') {
                const headers = ['ID', 'Nombre', 'Tipo de Alerta', 'URL', 'Fecha de Creación'];
                const csvRows = [headers.join(',')];

                searches.searchs.forEach(search => {
                    const row = [
                        search.id,
                        `"${search.name}"`,
                        search.alert_type,
                        `"${search.url}"`,
                        search.created_at
                    ];
                    csvRows.push(row.join(','));
                });

                return csvRows.join('\n');
            }

            throw new Error('Formato de exportación no soportado');
        } catch (error: any) {
            throw new Error(`Error exportando búsquedas guardadas: ${error.message}`);
        }
    }
}

// Exportar instancia singleton
export const savedSearchesService = new SavedSearchesService();
