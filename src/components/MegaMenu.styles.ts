import styled from 'styled-components';

export const MegaMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 650px;
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.13);
  padding: 36px 32px 24px 32px;
  margin-top: 18px;
  z-index: 100;
  display: flex;
  flex-direction: column;
`;

export const MegaMenuGrid = styled.div`
  display: flex;
  gap: 36px;
  width: 100%;
  margin-bottom: 18px;
`;

export const MegaMenuCol = styled.div`
  flex: 1;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MegaMenuTitle = styled.div`
  color: #388e3c;
  font-size: 1.08rem;
  font-weight: 700;
  margin-bottom: 6px;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const MegaMenuCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: #10451d;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 400;
  cursor: pointer;
  input[type='checkbox'] {
    accent-color: #388e3c;
    width: 18px;
    height: 18px;
    margin-right: 4px;
  }
`;

export const MegaMenuRadio = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: #10451d;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 400;
  cursor: pointer;
  input[type='radio'] {
    accent-color: #388e3c;
    width: 18px;
    height: 18px;
    margin-right: 4px;
  }
`;

export const MegaMenuInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
`;

export const MegaMenuInput = styled.input`
  padding: 8px 12px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  color: #10451d;
  font-family: 'Plus Jakarta Sans', sans-serif;
  margin-bottom: 2px;
`;

export const MegaMenuButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 18px;
`;

export const MegaMenuButton = styled.button`
  background: #97cb59;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 36px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  font-family: 'Plus Jakarta Sans', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: #7bb13c;
  }
`; 