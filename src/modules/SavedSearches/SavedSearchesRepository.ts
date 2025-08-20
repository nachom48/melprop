// =====================================================
// SAVED SEARCHES MODULE - REPOSITORY LAYER
// =====================================================

import axios from 'axios';
import { 
  CreateSavedSearchDTO, 
  UpdateSavedSearchDTO,
  RemoveSavedSearchDTO,
  SavedSearchesResponseDTO,
  CreateSavedSearchResponseDTO,
  UpdateSavedSearchResponseDTO,
  RemoveSavedSearchResponseDTO
} from './SavedSearches.dto';

const API_URI = process.env.REACT_APP_API_URI || 'http://backend-dev-melpropiedades.pre-produccion.com/api';

// Configurar Axios para enviar cookies automáticamente
axios.defaults.withCredentials = true;

export class SavedSearchesRepository {
  
  // =====================================================
  // SAVED SEARCHES METHODS
  // =====================================================

  /**
   * Crear nueva búsqueda guardada
   */
  async createSavedSearch(searchData: CreateSavedSearchDTO): Promise<CreateSavedSearchResponseDTO> {
    try {
      const response = await axios.post(`${API_URI}/searchs/`, searchData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error creando búsqueda guardada');
    }
  }

  /**
   * Obtener lista de búsquedas guardadas del usuario
   */
  async getSavedSearches(): Promise<SavedSearchesResponseDTO> {
    try {
      const response = await axios.get(`${API_URI}/searchs/`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error obteniendo búsquedas guardadas');
    }
  }

  /**
   * Actualizar búsqueda guardada existente
   */
  async updateSavedSearch(searchData: UpdateSavedSearchDTO): Promise<UpdateSavedSearchResponseDTO> {
    try {
      const response = await axios.patch(`${API_URI}/searchs/${searchData.id}/`, searchData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error actualizando búsqueda guardada');
    }
  }

  /**
   * Remover búsqueda guardada específica
   */
  async removeSavedSearch(searchData: RemoveSavedSearchDTO): Promise<RemoveSavedSearchResponseDTO> {
    try {
      const response = await axios.get(`${API_URI}/searchs/delete/${searchData.id}/`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error removiendo búsqueda guardada');
    }
  }

  /**
   * Obtener búsquedas guardadas por tipo de alerta
   */
  async getSavedSearchesByAlertType(alertType: string): Promise<SavedSearchesResponseDTO> {
    try {
      const allSearches = await this.getSavedSearches();
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
  async getSavedSearchesCount(): Promise<number> {
    try {
      const searches = await this.getSavedSearches();
      return searches.count || searches.searchs.length;
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
      const searches = await this.getSavedSearches();
      return searches.searchs.some(search => search.url === url);
    } catch (error: any) {
      console.error('Error verificando si la URL ya está guardada:', error);
      return false;
    }
  }

  /**
   * Obtener búsquedas guardadas recientes (últimas 5)
   */
  async getRecentSavedSearches(limit: number = 5): Promise<SavedSearchesResponseDTO> {
    try {
      const allSearches = await this.getSavedSearches();
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

// Exportar instancia singleton
export const savedSearchesRepository = new SavedSearchesRepository();
