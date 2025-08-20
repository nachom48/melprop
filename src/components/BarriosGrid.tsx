import React from 'react';
import BarriosCard from './BarriosCard';

interface Barrio {
    neighborhood: string;
    count?: number;
    description?: string;
    img?: string;
    title?: string;
}

interface BarriosGridProps {
    barrios: Barrio[];
}

const BarriosGrid: React.FC<BarriosGridProps> = ({ barrios }) => {
    return (
        <div className="w-4/5 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {barrios.map((barrio, index) => (
                    <BarriosCard key={index} barrio={barrio} />
                ))}
            </div>
        </div>
    );
};

export default BarriosGrid;
