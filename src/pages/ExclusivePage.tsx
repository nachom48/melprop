import React from 'react';
import Exclusive from '../components/Exclusive';
import OpportunitiesSlider from '../components/OpportunitiesSlider';
import BarriosSection from '../components/BarriosSection';

const ExclusivePage: React.FC = () => {
    return (
        <div>
            <Exclusive />
            <OpportunitiesSlider />
            <BarriosSection />
        </div>
    );
};

export default ExclusivePage; 