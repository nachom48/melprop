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
        <section className={`relative ${className}`}>
            <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-[440px] md:h-[520px] object-cover rounded-none"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center">
                <div className="container px-4">
                    <span className="label block">{label}</span>
                    <h2 className="mb-10 text-4xl text-white">{title}</h2>
                    <p className="text-green-fluo mb-6">{description}</p>
                    <a href={buttonHref} className="btn btn-plain !px-10 w-fit">
                        {buttonText}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
