import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { removeFavorite, removeAllFavorites } from '../services/auth';
import PropertyCard from '../components/PropertyCard';

const Favorites: React.FC = () => {
  const { user, isLoggedIn, favorites, loadFavorites } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    loadFavorites();
  }, [isLoggedIn, navigate, loadFavorites]);

  const handleRemoveFavorite = async (id: number) => {
    try {
      await removeFavorite(id);
      await loadFavorites();
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleRemoveAllFavorites = async () => {
    if (window.confirm('¿Estás seguro que deseas eliminar todos los favoritos?')) {
      try {
        await removeAllFavorites();
        await loadFavorites();
      } catch (error) {
        console.error('Error removing all favorites:', error);
      }
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-text">Favoritos</h1>
          {favorites.length > 0 && (
            <button
              onClick={handleRemoveAllFavorites}
              className="btn btn-white text-red-600 hover:bg-red-50"
            >
              Eliminar todos
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <i className="fas fa-heart text-6xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No hay favoritos agregados
            </h3>
            <p className="text-gray-500">
              Cuando agregues propiedades a favoritos, aparecerán aquí
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-green-text mb-2">
                Propiedades <span className="text-gray-500">({favorites.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((property) => (
                <div key={property.id} className="relative">
                  <PropertyCard property={property} />
                  <button
                    onClick={() => handleRemoveFavorite(property.id)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
                    title="Eliminar de favoritos"
                  >
                    <i className="fas fa-times text-red-500"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites; 