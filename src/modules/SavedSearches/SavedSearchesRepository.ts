// =====================================================
// SAVED SEARCHES MODULE - REPOSITORY LAYER
// =====================================================

import { apiClient } from '../../config/axios.config';
import {
  CreateSavedSearchDTO,
  UpdateSavedSearchDTO,
  RemoveSavedSearchDTO,
  SavedSearchesResponseDTO,
  CreateSavedSearchResponseDTO,
  UpdateSavedSearchResponseDTO,
  RemoveSavedSearchResponseDTO
} from './SavedSearches.dto';

export namespace SavedSearchesRepository {

  // =====================================================
  // SAVED SEARCHES METHODS
  // =====================================================

  /**
   * Crear nueva búsqueda guardada
   */
  export async function createSavedSearch(searchData: CreateSavedSearchDTO): Promise<CreateSavedSearchResponseDTO> {
    try {
      const response = await apiClient.post('/searchs/', searchData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error creando búsqueda guardada');
    }
  }

  /**
   * Obtener lista de búsquedas guardadas del usuario
   */
  export async function getSavedSearches(): Promise<SavedSearchesResponseDTO> {
    try {
      const response = await apiClient.get('/searchs/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error obteniendo búsquedas guardadas');
    }
  }

  /**
   * Actualizar búsqueda guardada existente
   */
  export async function updateSavedSearch(searchData: UpdateSavedSearchDTO): Promise<UpdateSavedSearchResponseDTO> {
    try {
      const response = await apiClient.patch(`/searchs/${searchData.id}/`, searchData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error actualizando búsqueda guardada');
    }
  }

  /**
   * Remover búsqueda guardada específica
   */
  export async function removeSavedSearch(searchData: RemoveSavedSearchDTO): Promise<RemoveSavedSearchResponseDTO> {
    try {
      const response = await apiClient.get(`/searchs/delete/${searchData.id}/`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error removiendo búsqueda guardada');
    }
  }

  /**
   * Obtener búsquedas guardadas por tipo de alerta
   */
  export async function getSavedSearchesByAlertType(alertType: string): Promise<SavedSearchesResponseDTO> {
    try {
      const allSearches = await getSavedSearches();
      const filteredSearches = allSearches.searchs.filter(search =>
        search.alert_type === alertType
      );

      return {
        ...allSearches,
        searchs: filteredSearches,
        count: filteredSearches.length
      };
    } catch (error: any) {
      throw new Error(`Error filtrando búsquedas por tipo de alerta: ${error.message}`);
    }
  }

  /**
   * Obtener cantidad de búsquedas guardadas
   */
  export async function getSavedSearchesCount(): Promise<number> {
    try {
      const searches = await getSavedSearches();
      return searches.count || searches.searchs.length;
    } catch (error: any) {
      console.error('Error obteniendo cantidad de búsquedas guardadas:', error);
      return 0;
    }
  }

  /**
   * Verificar si una URL ya está guardada
   */
  export async function isUrlAlreadySaved(url: string): Promise<boolean> {
    try {
      const searches = await getSavedSearches();
      return searches.searchs.some(search => search.url === url);
    } catch (error: any) {
      console.error('Error verificando si la URL ya está guardada:', error);
      return false;
    }
  }

  /**
   * Obtener búsquedas guardadas recientes (últimas 5)
   */
  export async function getRecentSavedSearches(limit: number = 5): Promise<SavedSearchesResponseDTO> {
    try {
      const allSearches = await getSavedSearches();
      const sortedSearches = allSearches.searchs.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      const recentSearches = sortedSearches.slice(0, limit);

      return {
        ...allSearches,
        searchs: recentSearches,
        count: recentSearches.length
      };
    } catch (error: any) {
      throw new Error(`Error obteniendo búsquedas recientes: ${error.message}`);
    }
  }
}
