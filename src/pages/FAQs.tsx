import React, { useState } from 'react';
import styled from 'styled-components';

const HeroSection = styled.div`
  background: #003b1f;
  padding: 32px 0;
`;

const HeroContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const HeroTitle = styled.h2`
  color: #d4f2ac;
  font-size: 30px;
  margin-bottom: 12px;
  font-weight: 600;
`;

const HeroDescription = styled.p`
  color: white;
  font-size: 20px;
  line-height: 36px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const SearchContainer = styled.div`
  display: flex;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  margin-top: 16px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: white;
  padding: 16px;
  outline: none;
  font-size: 16px;
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchButton = styled.button`
  background: #89ce48;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 0 6px 6px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background: #7bb83f;
  }
`;

const FAQContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 1rem;
`;

const FAQItem = styled.div<{ isOpen?: boolean }>`
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 16px;
  margin-bottom: 16px;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const FAQHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 8px 0;
  
  &:hover h3 {
    color: #047857;
  }
`;

const FAQTitle = styled.h3`
  color: #332E29;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  transition: color 0.2s;
`;

const FAQIcon = styled.i<{ isOpen?: boolean }>`
  color: #6b7280;
  transition: transform 0.2s;
  transform: ${props => props.isOpen ? 'rotate(90deg)' : 'rotate(0deg)'};
`;

const FAQContent = styled.div<{ isOpen?: boolean }>`
  max-height: ${props => props.isOpen ? '200px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  margin-top: ${props => props.isOpen ? '12px' : '0'};
`;

const FAQText = styled.p`
  color: #374151;
  line-height: 1.6;
  margin: 0;
`;

// Datos de las FAQs
const faqData = [
    {
        id: 1,
        question: "¿Cómo guardo mis búsquedas para recibir alertas?",
        answer: "Primero, realizá una búsqueda de propiedades según tu interés, ya sea para compra o alquiler. Luego, en los resultados, tenés la opción de usar los filtros disponibles para ajustar los criterios de acuerdo a tus necesidades. Finalmente, activá alertas basadas en estos criterios. En 'Búsquedas guardadas', dentro de tu perfil, vas a poder ajustar la frecuencia de las alertas, modificarlas o eliminarlas cuando lo necesites."
    },
    {
        id: 2,
        question: "¿Cómo busco un inmueble?",
        answer: "Para buscar un inmueble, podés usar los filtros en la página principal. Seleccioná el tipo de operación (compra o alquiler), el tipo de propiedad, ubicación, ambientes, características y rango de precios. También podés usar la barra de búsqueda para buscar por palabra clave."
    },
    {
        id: 3,
        question: "¿Como edito las búsquedas guardadas?",
        answer: "Para editar tus búsquedas guardadas, accedé a tu perfil y seleccioná 'Búsquedas guardadas'. Allí podrás modificar los criterios de búsqueda, cambiar la frecuencia de las alertas, agregar notas o eliminar búsquedas que ya no necesites."
    },
    {
        id: 4,
        question: "¿Como Marco una propiedad como favorita?",
        answer: "Para marcar una propiedad como favorita, simplemente hacé clic en el ícono de corazón que aparece en cada publicación. Las propiedades favoritas se guardarán en tu perfil y podrás acceder a ellas desde la sección 'Favoritos'."
    },
    {
        id: 5,
        question: "¿Como comparto una publicación?",
        answer: "Para compartir una publicación, utilizá los botones de compartir que aparecen en cada propiedad. Podés compartir por WhatsApp, email o copiar el enlace directo de la publicación."
    },
    {
        id: 6,
        question: "¿Como busco una propiedad?",
        answer: "Podés buscar propiedades de varias formas: usando los filtros avanzados en la página principal, escribiendo en la barra de búsqueda, navegando por las diferentes categorías o usando el mapa interactivo para buscar por ubicación."
    },
    {
        id: 7,
        question: "¿Mel propiedades es quien me alquila o vende la propiedad?",
        answer: "Mel Propiedades actúa como intermediario entre propietarios e inquilinos/compradores. Nos encargamos de la gestión, comercialización y asesoramiento en todo el proceso, pero los contratos se realizan directamente con los propietarios de las propiedades."
    }
];

const FAQs: React.FC = () => {
    const [openFAQ, setOpenFAQ] = useState<number | null>(1); // Primera FAQ abierta por defecto
    const [searchTerm, setSearchTerm] = useState('');

    const handleFAQClick = (id: number) => {
        setOpenFAQ(openFAQ === id ? null : id);
    };

    const filteredFAQs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = () => {
        // La búsqueda se hace automáticamente con el filtro
        console.log('Buscando:', searchTerm);
    };

    return (
        <>
            <HeroSection>
                <div className="container">
                    <HeroContent>
                        <HeroTitle>Centro de ayuda</HeroTitle>
                        <HeroDescription>
                            Encontrará respuestas a las consultas más habituales sobre nuestros servicios, el proceso de búsqueda de
                            propiedades, requisitos y más.
                        </HeroDescription>
                        <SearchContainer>
                            <SearchInput
                                type="text"
                                placeholder="Busca por palabra clave o hace una pregunta"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <SearchButton onClick={handleSearch}>
                                <i className="fas fa-search"></i>
                                Buscar
                            </SearchButton>
                        </SearchContainer>
                    </HeroContent>
                </div>
            </HeroSection>

            <FAQContainer>
                <div>
                    {filteredFAQs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                            <p>No se encontraron preguntas que coincidan con tu búsqueda.</p>
                        </div>
                    ) : (
                        filteredFAQs.map((faq) => (
                            <FAQItem key={faq.id}>
                                <FAQHeader onClick={() => handleFAQClick(faq.id)}>
                                    <FAQTitle>{faq.question}</FAQTitle>
                                    <FAQIcon
                                        className="fa fa-chevron-right"
                                        isOpen={openFAQ === faq.id}
                                    />
                                </FAQHeader>
                                <FAQContent isOpen={openFAQ === faq.id}>
                                    <FAQText>{faq.answer}</FAQText>
                                </FAQContent>
                            </FAQItem>
                        ))
                    )}
                </div>
            </FAQContainer>
        </>
    );
};

export default FAQs; 