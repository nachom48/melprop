import React from 'react';

interface HeroSectionProps {
    imageSrc: string;
    imageAlt: string;
    label: string;
    title: string;
    description: string;
    buttonText: string;
    buttonHref?: string;
    className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    imageSrc,
    imageAlt,
    label,
    title,
    description,
    buttonText,
    buttonHref = "#",
    className = ""
}) => {
    return (
        <div className={`highlight ${className}`}>
            <div className="image image-opacity">
                <img src={imageSrc} alt={imageAlt} />
            </div>
            <div className="container">
                <div className="info pl-20">
                    <span className="label">{label}</span>
                    <h2 className="mb-10 text-4xl !text-white">{title}</h2>
                    <p className="text-green-fluo text-lg leading-relaxed">{description}</p>
                    <a href={buttonHref} className="btn btn-plain !px-10 w-fit">
                        {buttonText}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
