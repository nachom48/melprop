// Exportar componentes
export { default as PropertyCard } from './components/PropertyCard';
export { default as Navbar } from './components/Navbar';
export { default as Footer } from './components/Footer';

// Exportar contextos
export { useUser } from './context/UserContext';

// Exportar servicios
export { default as PropertiesService } from './services/propertiesService';

// Exportar repositories
export { default as PropertiesRepository } from './repositories/propertiesRepository';

// Exportar tipos
export type { Property, SearchFilters, PropertiesResponse, Development } from './repositories/propertiesRepository';
