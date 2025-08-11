import React, { useState, useEffect } from 'react';
import { getDevelopments, getDevelopmentBanners } from '../services/auth';

interface Development {
    id: number;
    name: string;
    slug: string;
    neighborhood: string;
    address: string;
    main_image: string;
    rooms: any[];
    amenities: any[];
    external_url?: string;
}

const Emprendimientos: React.FC = () => {
    const [developments, setDevelopments] = useState<Development[]>([]);
    const [banners, setBanners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [developmentsData, bannersData] = await Promise.all([
                    getDevelopments(),
                    getDevelopmentBanners()
                ]);

                setDevelopments(developmentsData.objects || []);
                setBanners(bannersData || []);
            } catch (error) {
                console.error('Error loading developments:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const formatRooms = (rooms: any[]) => {
        if (!rooms || rooms.length === 0) return '';
        const roomTypes = rooms.map(room => room.type).join(', ');
        return `${roomTypes} ambientes`;
    };

    const getDevelopmentAddress = (address: string) => {
        const parts = address.split(',');
        return [parts[0] || '', parts.slice(1).join(',') || ''];
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando emprendimientos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-green-text mb-4">Emprendimientos</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Descubrí los mejores emprendimientos inmobiliarios con las mejores ubicaciones y amenidades
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {developments.map((development, index) => {
                    const address = getDevelopmentAddress(development.address);

                    return (
                        <div key={development.id} className="development-card">
                            <div className="development-image">
                                <img
                                    src={development.main_image}
                                    alt={development.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="development-overlay">
                                    <span className="neighborhood-badge">{development.neighborhood}</span>
                                </div>
                            </div>

                            <div className="development-info p-6">
                                <h3 className="development-title text-xl font-semibold mb-2">
                                    {development.name}
                                </h3>
                                <p className="development-address text-gray-600 mb-3">
                                    <strong>{address[0]}</strong> {address[1]}
                                </p>

                                {development.rooms && development.rooms.length > 0 && (
                                    <p className="development-rooms text-sm text-gray-500 mb-4">
                                        {formatRooms(development.rooms)}
                                    </p>
                                )}

                                {development.amenities && development.amenities.length > 0 && (
                                    <div className="development-amenities flex flex-wrap gap-2 mb-4">
                                        {development.amenities.slice(0, 3).map((amenity, idx) => (
                                            <div
                                                key={idx}
                                                className="amenity-icon w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                                                title={amenity.name}
                                            >
                                                <img
                                                    src={amenity.image?.url}
                                                    alt={amenity.name}
                                                    className="w-5 h-5"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="development-actions">
                                    <a
                                        href={development.external_url || `/emprendimientos/${development.slug}`}
                                        className="btn btn-green w-full text-center"
                                        target={development.external_url ? "_blank" : "_self"}
                                    >
                                        Ver más
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Emprendimientos; 