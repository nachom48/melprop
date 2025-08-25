export interface NeighborhoodInfo {
    name: string;
    description?: string;
    transport_info?: string;
    amenities?: string[];
    boundaries?: string;
    commune?: string;
}

interface PropertyData {
    neighborhood: string;
    description?: string;
    body?: string;
}

interface NeighborhoodData {
    [neighborhoodName: string]: {
        description: string;
        boundaries?: string;
        commune?: string;
        transport_info: string;
        properties_count: number;
    };
}

export class NeighborhoodService {
    private static neighborhoodData: NeighborhoodData | null = null;

    static async getNeighborhoodInfo(neighborhoodName: string): Promise<NeighborhoodInfo | null> {
        try {
            console.log('🔍 Buscando información del barrio:', neighborhoodName);

            // Cargar datos de barrios si no están cargados
            if (!this.neighborhoodData) {
                await this.loadNeighborhoodData();
            }

            if (this.neighborhoodData && this.neighborhoodData[neighborhoodName]) {
                const data = this.neighborhoodData[neighborhoodName];
                return {
                    name: neighborhoodName,
                    description: data.description,
                    transport_info: data.transport_info,
                    boundaries: data.boundaries,
                    commune: data.commune
                };
            }

            // Si no hay datos específicos, generar información básica
            return this.generateBasicInfo(neighborhoodName);

        } catch (error) {
            console.error('❌ Error al obtener información del barrio:', error);
            return this.generateBasicInfo(neighborhoodName);
        }
    }

    // Cargar datos de barrios desde el archivo local
    private static async loadNeighborhoodData(): Promise<void> {
        try {
            console.log('📥 Cargando datos de barrios desde archivo local...');

            // Importar el archivo data.json local
            const data = await import('../../static/data.json');

            console.log('✅ Datos de barrios cargados:', data);

            // Procesar los datos para extraer información de barrios
            this.neighborhoodData = this.processNeighborhoodData(data.default || data);

        } catch (error) {
            console.error('❌ Error al cargar datos de barrios:', error);
            // Si falla, usar datos hardcodeados como fallback
            this.neighborhoodData = this.getHardcodedData();
        }
    }

    // Procesar los datos del archivo para extraer información de barrios
    private static processNeighborhoodData(data: any): NeighborhoodData {
        const neighborhoods: NeighborhoodData = {};

        if (Array.isArray(data)) {
            data.forEach((property: PropertyData) => {
                if (property.neighborhood && property.neighborhood.trim()) {
                    const neighborhoodName = property.neighborhood.trim();

                    if (!neighborhoods[neighborhoodName]) {
                        neighborhoods[neighborhoodName] = {
                            description: '',
                            boundaries: '',
                            commune: '',
                            transport_info: this.generateTransportInfo(neighborhoodName),
                            properties_count: 0
                        };
                    }

                    neighborhoods[neighborhoodName].properties_count++;

                    // Extraer descripción del barrio de la descripción de la propiedad
                    if (property.description && property.description.includes(neighborhoodName)) {
                        const sentences = property.description.split(/[.!?]+/);
                        const neighborhoodSentences = sentences.filter(sentence =>
                            sentence.toLowerCase().includes(neighborhoodName.toLowerCase()) &&
                            (sentence.toLowerCase().includes('barrio') ||
                                sentence.toLowerCase().includes('zona') ||
                                sentence.toLowerCase().includes('área'))
                        );

                        if (neighborhoodSentences.length > 0) {
                            neighborhoods[neighborhoodName].description = neighborhoodSentences[0].trim();
                        }
                    }

                    // Extraer información de límites y comuna
                    if (property.body) {
                        const bodyText = property.body.toLowerCase();

                        // Buscar límites
                        if (bodyText.includes('comprendido por las calles')) {
                            const boundaryMatch = property.body.match(/comprendido por las calles ([^.]+)/i);
                            if (boundaryMatch) {
                                neighborhoods[neighborhoodName].boundaries = boundaryMatch[1].trim();
                            }
                        }

                        // Buscar comuna
                        if (bodyText.includes('comuna')) {
                            const communeMatch = property.body.match(/comuna (\d+)/i);
                            if (communeMatch) {
                                neighborhoods[neighborhoodName].commune = `Comuna ${communeMatch[1]}`;
                            }
                        }
                    }
                }
            });
        }

        console.log('🏘️ Barrios procesados:', Object.keys(neighborhoods));
        return neighborhoods;
    }

    // Datos hardcodeados como fallback
    private static getHardcodedData(): NeighborhoodData {
        return {
            'Belgrano': {
                description: 'Barrio residencial elegante y tradicional de Buenos Aires. Conocido por sus calles arboladas, arquitectura francesa y excelente conectividad.',
                boundaries: 'Av. del Libertador, Av. Cabildo, Av. Monroe, Av. Congreso, Av. Juramento y Av. Olleros',
                commune: 'Comuna 13',
                transport_info: 'Subte Línea D, Ferrocarril Mitre, múltiples líneas de colectivo. Excelente conectividad con el centro.',
                properties_count: 0
            },
            'Villa Urquiza': {
                description: 'Barrio residencial tranquilo y arbolado. Conocido por sus calles amplias, plazas pintorescas y arquitectura ecléctica.',
                boundaries: 'Crisólogo Larralde, Galván, Núñez, Vías del F.G.B.M., Tronador, Franklin D. Roosevelt, Estomba, Monroe, Rómulo Naón, La Pampa y Av. de los Constituyentes',
                commune: 'Comuna 12',
                transport_info: 'Subte Línea B, Estación "Urquiza" del Ferrocarril Mitre, líneas de colectivo 71, 76, 80, 87, 90, 93, 107, 108, 112.',
                properties_count: 0
            },
            'Palermo': {
                description: 'Barrio dinámico y cosmopolita, uno de los más grandes de Buenos Aires. Conocido por sus parques, vida nocturna y ambiente bohemio.',
                boundaries: 'Av. del Libertador, Av. Santa Fe, Av. Córdoba, Av. Juan B. Justo y Av. Dorrego',
                commune: 'Comuna 14',
                transport_info: 'Subte Líneas A y D, múltiples líneas de colectivo. Excelente conectividad con toda la ciudad.',
                properties_count: 0
            }
        };
    }

    // Generar información básica si no hay datos específicos
    private static generateBasicInfo(neighborhoodName: string): NeighborhoodInfo {
        return {
            name: neighborhoodName,
            description: `Barrio residencial ${neighborhoodName} con excelente calidad de vida. Zona tranquila y bien conectada con el centro de la ciudad.`,
            transport_info: this.generateTransportInfo(neighborhoodName),
            boundaries: undefined,
            commune: undefined
        };
    }

    // Generar información de transporte según el barrio
    private static generateTransportInfo(neighborhoodName: string): string {
        const transportInfo: { [key: string]: string } = {
            'Belgrano': 'Subte Línea D, Ferrocarril Mitre, múltiples líneas de colectivo. Excelente conectividad con el centro.',
            'Villa Urquiza': 'Subte Línea B, Estación "Urquiza" del Ferrocarril Mitre, líneas de colectivo 71, 76, 80, 87, 90, 93, 107, 108, 112.',
            'Palermo': 'Subte Líneas A y D, múltiples líneas de colectivo. Excelente conectividad con toda la ciudad.',
            'Recoleta': 'Subte Línea H, múltiples líneas de colectivo. Zona céntrica con excelente transporte público.',
            'Saavedra': 'Subte Línea B, Ferrocarril Mitre, múltiples líneas de colectivo.',
            'Villa del Parque': 'Subte Línea A, múltiples líneas de colectivo. Buena conectividad con el centro.',
            'default': 'Subte, colectivos y trenes cercanos. Buena conectividad con el centro de la ciudad.'
        };

        return transportInfo[neighborhoodName] || transportInfo.default;
    }

    // Método para limpiar la caché de datos
    static clearCache(): void {
        this.neighborhoodData = null;
    }
}

export default NeighborhoodService;
