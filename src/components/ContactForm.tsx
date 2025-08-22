import React from 'react';

interface ContactFormProps {
    title: string;
    description: string;
    selectOptions?: string[];
    selectPlaceholder?: string;
    buttonText?: string;
    className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
    title,
    description,
    selectOptions = [],
    selectPlaceholder = "Seleccionar motivo",
    buttonText = "Consultar ahora!",
    className = ""
}) => {
    return (
        <div className={`relative bg-buildings ${className}`}>
            <div className="bg-light-grey m-auto w-full max-w-[668px] rounded-t-2xl rounded-tr-2xl px-10 py-6 md:px-16">
                <div className="flex flex-col items-center">
                    <h2 className="!text-green-text-dark mb-10 text-center text-2xl md:text-3xl">
                        {title}
                    </h2>
                    <p className="mb-10 text-center">
                        {description}
                    </p>
                    <div className="w-full md:w-[80%]">
                        <form action="">
                            <div className="flex flex-col items-center gap-4">
                                <div className="wrapper-input border-input-border w-full rounded-md border-1">
                                    <input type="text" placeholder="Nombre" />
                                </div>
                                <div className="wrapper-input border-input-border w-full rounded-md border-1">
                                    <input type="tel" placeholder="Celular" />
                                </div>
                                <div className="wrapper-input border-input-border w-full rounded-md border-1">
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div className="w-full">
                                    <select name="" id="" className="select w-full rounded-t-md rounded-b-md focus-visible:outline-none">
                                        <option value="">{selectPlaceholder}</option>
                                        {selectOptions.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn">{buttonText}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
