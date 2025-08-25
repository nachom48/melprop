import React, { useState } from 'react';

interface PropertyContactFormProps {
    propertyName: string;
    className?: string;
}

const PropertyContactForm: React.FC<PropertyContactFormProps> = ({ propertyName, className = "" }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
        recibirNovedades: true
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
        // Aquí implementarías la lógica para enviar el formulario
    };

    return (
        <div className={`bg-white rounded-2xl p-6 shadow-lg ${className}`}>
            <h3 className="text-xl font-bold text-green-text-dark mb-6">
                Quiero más información sobre esta propiedad
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre */}
                <div className="wrapper-input border-input-border w-full rounded-md border-1">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-text focus:ring-offset-2"
                        required
                    />
                </div>

                {/* Email */}
                <div className="wrapper-input border-input-border w-full rounded-md border-1">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-text focus:ring-offset-2"
                        required
                    />
                </div>

                {/* Teléfono */}
                <div className="wrapper-input border-input-border w-full rounded-md border-1">
                    <input
                        type="tel"
                        name="telefono"
                        placeholder="Teléfono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-text focus:ring-offset-2"
                        required
                    />
                </div>

                {/* Mensaje */}
                <div className="wrapper-input border-input-border w-full rounded-md border-1">
                    <textarea
                        name="mensaje"
                        placeholder="Vi esta propiedad y quiero que me contacten para recibir más información. Gracias!"
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-text focus:ring-offset-2 resize-none"
                        required
                    />
                </div>

                {/* Checkbox novedades */}
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        name="recibirNovedades"
                        id="recibirNovedades"
                        checked={formData.recibirNovedades}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-text border-gray-300 rounded focus:ring-green-text focus:ring-2"
                    />
                    <label htmlFor="recibirNovedades" className="text-sm text-gray-700">
                        Deseo recibir novedades relacionadas.
                    </label>
                </div>

                {/* Botón enviar */}
                <button
                    type="submit"
                    className="w-full bg-green-text-dark text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-text transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-text focus:ring-offset-2"
                >
                    Consultar
                </button>
            </form>
        </div>
    );
};

export default PropertyContactForm;
