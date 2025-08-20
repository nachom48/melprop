// =====================================================
// MODULES INDEX - EXPORT ALL MODULES AND SERVICES
// =====================================================

// =====================================================
// USER MODULE
// =====================================================
export * from './User/User.dto';
export { userService } from './User/UserService';
export { userRepository } from './User/UserRepository';

// =====================================================
// FAVORITES MODULE
// =====================================================
export * from './Favorites/Favorites.dto';
export { favoritesService } from './Favorites/FavoritesService';
export { favoritesRepository } from './Favorites/FavoritesRepository';

// =====================================================
// SAVED SEARCHES MODULE
// =====================================================
export * from './SavedSearches/SavedSearches.dto';
export { savedSearchesService } from './SavedSearches/SavedSearchesService';
export { savedSearchesRepository } from './SavedSearches/SavedSearchesRepository';

// =====================================================
// PROPERTIES MODULE (NAMESPACE)
// =====================================================
export * from './Properties';

// =====================================================
// BARRIO MODULE (NAMESPACE)
// =====================================================
export * from './Barrio';

// =====================================================
// MAIN SERVICES EXPORT
// =====================================================
export { userService as UserService } from './User/UserService';
export { favoritesService as FavoritesService } from './Favorites/FavoritesService';
export { savedSearchesService as SavedSearchesService } from './SavedSearches/SavedSearchesService';

// =====================================================
// MAIN REPOSITORIES EXPORT
// =====================================================
export { userRepository as UserRepository } from './User/UserRepository';
export { favoritesRepository as FavoritesRepository } from './Favorites/FavoritesRepository';
export { savedSearchesRepository as SavedSearchesRepository } from './SavedSearches/SavedSearchesRepository';
