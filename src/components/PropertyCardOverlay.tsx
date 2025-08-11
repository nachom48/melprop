import React from 'react';

export interface PropertyCardOverlayProps {
    id: string;
    image: string;
    title: string;
    neighborhood: string;
    description: string;
    price: string;
    status: string;
    possession: string;
    isLarge?: boolean;
    onFavoriteToggle?: (id: string) => void;
    isFavorite?: boolean;
}

const PropertyCardOverlay: React.FC<PropertyCardOverlayProps> = ({
    id,
    image,
    title,
    neighborhood,
    description,
    price,
    status,
    possession,
    isLarge = false,
    onFavoriteToggle,
    isFavorite = false
}) => {
    const handleFavoriteClick = () => {
        if (onFavoriteToggle) {
            onFavoriteToggle(id);
        }
    };

    return (
        <a href="" className={isLarge ? "md:col-span-2" : ""}>
            <div className="relative overflow-hidden rounded-lg">
                <div className="image-opacity-500">
                    <img
                        className={`aspect-[8/11] w-full object-cover ${isLarge ? 'md:aspect-[8/5.29]' : ''}`}
                        src={image}
                        alt={title}
                    />
                </div>
                <div className="absolute top-0 p-8">
                    <h3 className="marker marker-offset-left mb-5 text-3xl !text-white">
                        {title}
                    </h3>
                    <h4 className="text-green-fluo font-bold uppercase">{neighborhood}</h4>
                    <div className="text-white">{description}</div>
                </div>
                <div className="absolute bottom-0 p-8">
                    <div className="text-white">Desde</div>
                    <h3 className="!text-green-fluo text-4xl">{price}</h3>
                    <div className="mt-4 flex gap-4">
                        <div>
                            <div className="text-white">Estado</div>
                            <h4 className="text-warning uppercase">{status}</h4>
                        </div>
                        <div>
                            <div className="text-white">Posesión</div>
                            <h4 className="text-warning uppercase">{possession}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default PropertyCardOverlay; 