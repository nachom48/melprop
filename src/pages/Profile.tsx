import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { editProfileData } from '../services/auth';
import ProfileLayout from '../components/ProfileLayout';
import styled from 'styled-components';

const FormGrid = styled.div`
  display: flex;
  gap: 24px;
`;

const FormHalf = styled.div`
  flex: 1;
`;

const FormFull = styled.div`
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

const Divider = styled.div`
  border-bottom: 2px solid #d1d5db;
  padding-bottom: 40px;
  margin-bottom: 24px;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 12px;
  color: #374151;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #059669;
`;

const PrivacyText = styled.p`
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 12px;
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

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        mobile: '',
        birthDate: '',
        email: '',
        newEmail: '',
        confirmEmail: '',
        acceptPromotional: false
    });

    useEffect(() => {
        // Redirigir si no está logueado
        if (!isLoggedIn) {
            navigate('/');
            return;
        }

        // Cargar datos del usuario del contexto
        if (user) {
            const [firstName, ...lastNameParts] = (user.fullName || '').split(' ');
            setFormData({
                firstName: firstName || '',
                lastName: lastNameParts.join(' ') || '',
                phone: user.phone || '',
                mobile: user.mobile || '',
                birthDate: user.birthDate || '',
                email: user.email || '',
                newEmail: '',
                confirmEmail: '',
                acceptPromotional: user.acceptPromotional || false
            });
        }
    }, [user, isLoggedIn, navigate]);

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await editProfileData({
                first_name: formData.firstName,
                last_name: formData.lastName,
                phone: formData.phone,
                mobile: formData.mobile,
                birth_date: formData.birthDate,
                email: formData.newEmail || formData.email,
                accept_promotional: formData.acceptPromotional
            });

            if (response.data.user) {
                // Actualizar el contexto del usuario
                const updatedUser = { ...user, ...response.data.user };
                // Aquí actualizarías el contexto
                console.log('Datos guardados exitosamente');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isLoggedIn || !user) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <p>Redirigiendo...</p>
            </div>
        );
    }

    return (
        <ProfileLayout title="Datos personales">
            <form onSubmit={handleSave}>
                <FormGrid>
                    <FormHalf>
                        <Label htmlFor="firstName">Nombre</Label>
                        <InputWrapper>
                            <Input
                                type="text"
                                id="firstName"
                                placeholder="Ingresá tu nombre"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                required
                            />
                        </InputWrapper>
                    </FormHalf>
                    <FormHalf>
                        <Label htmlFor="lastName">Apellido</Label>
                        <InputWrapper>
                            <Input
                                type="text"
                                id="lastName"
                                placeholder="Ingresá tu apellido"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                required
                            />
                        </InputWrapper>
                    </FormHalf>
                </FormGrid>

                <FormGrid>
                    <FormHalf>
                        <Label htmlFor="mobile">Celular</Label>
                        <InputWrapper>
                            <Input
                                type="tel"
                                id="mobile"
                                placeholder="Ingresar..."
                                value={formData.mobile}
                                onChange={(e) => handleInputChange('mobile', e.target.value)}
                                required
                            />
                        </InputWrapper>
                    </FormHalf>
                    <FormHalf>
                        <Label htmlFor="phone">Teléfono</Label>
                        <InputWrapper>
                            <Input
                                type="tel"
                                id="phone"
                                placeholder="Ingresar..."
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                required
                            />
                        </InputWrapper>
                    </FormHalf>
                </FormGrid>

                <FormGrid>
                    <FormHalf>
                        <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                        <InputWrapper>
                            <Input
                                type="date"
                                id="birthDate"
                                placeholder="Ingresar..."
                                value={formData.birthDate}
                                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                required
                            />
                        </InputWrapper>
                    </FormHalf>
                </FormGrid>

                <FormFull>
                    <Label htmlFor="email">Dirección de email</Label>
                    <InputWrapper>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Ingresar..."
                            value={formData.email}
                            disabled
                        />
                    </InputWrapper>
                </FormFull>

                <FormFull>
                    <Label htmlFor="newEmail">Nuevo email</Label>
                    <InputWrapper>
                        <Input
                            type="email"
                            id="newEmail"
                            placeholder="Ingresar..."
                            value={formData.newEmail}
                            onChange={(e) => handleInputChange('newEmail', e.target.value)}
                        />
                    </InputWrapper>
                </FormFull>

                <Divider>
                    <FormFull>
                        <Label htmlFor="confirmEmail">Repetir nuevo email</Label>
                        <InputWrapper>
                            <Input
                                type="email"
                                id="confirmEmail"
                                placeholder="Ingresar..."
                                value={formData.confirmEmail}
                                onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
                            />
                        </InputWrapper>
                    </FormFull>
                </Divider>

                <FormFull>
                    <CheckboxWrapper>
                        <Checkbox
                            type="checkbox"
                            id="acceptPromotional"
                            checked={formData.acceptPromotional}
                            onChange={(e) => handleInputChange('acceptPromotional', e.target.checked)}
                        />
                        <span>Acepto recibir información promocional de Mel Propiedades</span>
                    </CheckboxWrapper>

                    <PrivacyText>
                        Tu información puede ser usada por Mel Propiedades a fin de hacerte llegar información promocional. En
                        cualquier momento podrás solicitar el acceso, rectificación, supresión, restricción, objeción o retiro
                        de tu consentimiento, desuscribirte contactándote a legales.ar@melpropiedades.com.ar. Usted también
                        tiene el derecho de reclamar ante la Agencia de Acceso a la Información Pública. Por favor lee nuestras
                        Políticas de Privacidad
                    </PrivacyText>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar cambios'}
                    </Button>
                </FormFull>
            </form>
        </ProfileLayout>
    );
};

export default Profile; 