import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { userService } from '../modules';
import ProfileLayout from '../components/ProfileLayout';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
  background: ${props => props.disabled ? '#f9fafb' : 'white'};
  color: ${props => props.disabled ? '#6b7280' : '#374151'};
  
  &:focus {
    outline: none;
    border-color: #059669;
    box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  background: linear-gradient(to right, #059669, #10b981);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: fit-content;
  
  &:hover {
    background: linear-gradient(to right, #047857, #059669);
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ChangePassword: React.FC = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn, favorites, savedSearches } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    if (!isLoggedIn || !user) {
        navigate('/');
        return null;
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await userService.changePassword({
                current_password: formData.currentPassword,
                new_password: formData.newPassword,
                new_password_b: formData.confirmPassword
            });

            // Limpiar formulario
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

            alert('Contraseña cambiada exitosamente');
        } catch (error) {
            console.error('Error al cambiar contraseña:', error);
            alert('Error al cambiar la contraseña');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProfileLayout
            title="Cambio de contraseña"
            favoritesCount={favorites.length}
            searchesCount={savedSearches.length}
        >
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="currentPassword">Contraseña actual</Label>
                        <InputWrapper>
                            <Input
                                type="password"
                                id="currentPassword"
                                placeholder="Ingresar..."
                                value={formData.currentPassword}
                                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                                required
                            />
                        </InputWrapper>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="newPassword">Nueva contraseña</Label>
                        <InputWrapper>
                            <Input
                                type="password"
                                id="newPassword"
                                placeholder="Ingresar..."
                                value={formData.newPassword}
                                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                required
                            />
                        </InputWrapper>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="confirmPassword">Repetir nueva contraseña</Label>
                        <InputWrapper>
                            <Input
                                type="password"
                                id="confirmPassword"
                                placeholder="Ingresar..."
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                required
                            />
                        </InputWrapper>
                    </FormGroup>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar cambios'}
                    </Button>
                </form>
            </FormContainer>
        </ProfileLayout>
    );
};

export default ChangePassword; 