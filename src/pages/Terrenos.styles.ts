import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px 0 16px;
`;

export const FiltrosBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
`;

export const FiltroInput = styled.input`
  padding: 12px 18px;
  border-radius: 10px;
  border: 1.5px solid #d1d5db;
  font-size: 1rem;
  min-width: 260px;
  background: #fff;
  color: #10451d;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const FiltroSelect = styled.select`
  padding: 12px 18px;
  border-radius: 10px;
  border: 1.5px solid #d1d5db;
  font-size: 1rem;
  background: #fff;
  color: #10451d;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const FiltroButton = styled.button`
  padding: 12px 18px;
  border-radius: 10px;
  border: 1.5px solid #97cb59;
  background: #fff;
  color: #388e3c;
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Plus Jakarta Sans', sans-serif;
  cursor: pointer;
  position: relative;
`;

export const ResultadosInfo = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 18px 24px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ResultadosTitulo = styled.div`
  color: #388e3c;
  font-size: 1.1rem;
  font-weight: 700;
`;

export const ResultadosCantidad = styled.div`
  color: #10451d;
  font-size: 1rem;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 32px;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const CardImg = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

export const CardContent = styled.div`
  padding: 18px 20px 16px 20px;
`;

export const CardTipo = styled.span`
  color: #388e3c;
  font-size: 1rem;
  font-weight: 600;
`;

export const CardPrecio = styled.h3`
  color: #10451d;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 8px 0 8px 0;
`;

export const CardDireccion = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const CardBarrio = styled.div`
  font-size: 0.98rem;
  color: #666;
  margin-bottom: 10px;
`;

export const CardDetalles = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.93rem;
  color: #10451d;
  list-style: none;
  padding: 0;
  margin: 0;
`; 