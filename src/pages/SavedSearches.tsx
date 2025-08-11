import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { removeSavedSearch } from '../services/auth';

const SavedSearches: React.FC = () => {
  const { user, isLoggedIn, savedSearches, loadSavedSearches } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    loadSavedSearches();
  }, [isLoggedIn, navigate, loadSavedSearches]);

  const handleRemoveSearch = async (id: number) => {
    try {
      await removeSavedSearch(id);
      await loadSavedSearches();
    } catch (error) {
      console.error('Error removing saved search:', error);
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-text">Búsquedas guardadas</h1>
        </div>

        {savedSearches.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <i className="fas fa-search text-6xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No hay búsquedas guardadas
            </h3>
            <p className="text-gray-500">
              Cuando guardes búsquedas, aparecerán aquí
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-green-text mb-2">
                Búsquedas <span className="text-gray-500">({savedSearches.length})</span>
              </h2>
            </div>

            <div className="space-y-4">
              {savedSearches.map((search) => (
                <div key={search.id} className="search-card">
                  <div className="search-content">
                    <div className="search-info">
                      <h3 className="search-name text-lg font-semibold text-green-text mb-2">
                        {search.name}
                      </h3>
                      <p className="search-type text-sm text-gray-600 mb-2">
                        Tipo: {search.alert_type}
                      </p>
                      <p className="search-url text-sm text-gray-500">
                        {search.url}
                      </p>
                    </div>

                    <div className="search-actions">
                      <a
                        href={search.url}
                        className="btn btn-green"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver resultados
                      </a>
                      <button
                        onClick={() => handleRemoveSearch(search.id)}
                        className="btn btn-white text-red-600 hover:bg-red-50"
                        title="Eliminar búsqueda"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedSearches; 