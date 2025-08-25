import React from 'react';
import HeaderDetail from './HeaderDetail';
import DevelopmentOverview from './DevelopmentOverview';

interface DevelopmentDetailProps {
    development: any;
}

const DevelopmentDetail: React.FC<DevelopmentDetailProps> = ({ development }) => {
    console.log("esto vale development", development);

    return (
        <div className="min-h-screen">
            {/* Header de pantalla completa */}
            <HeaderDetail
                headerImage={development.header_image}
                title="Exclusividad"
                subtitle="en cada detalle"
            />

            {/* Segunda sección - Descripción general */}
            <DevelopmentOverview development={development} />

            {/* TODO: Aquí irán las demás secciones del emprendimiento */}
        </div>
    );
};

export default DevelopmentDetail;
