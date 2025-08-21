import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { UserService } from '../modules/User/UserService';
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
    const { user, isLoggedIn, updateUser, favorites, savedSearches } = useUser();
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
        dni: '',
        gender: '',
        location: '',
        acceptPromotional: false
    });

    useEffect(() => {
        // Redirigir si no está logueado
        if (!isLoggedIn) {
            navigate('/');
            return;
        }

        // Cargar datos del usuario del contexto y autocompletar el formulario
        if (user) {
            console.log('Usuario en Profile:', user); // Debug log

            // Separar el full_name en firstName y lastName si están vacíos
            let firstName = user.first_name;
            let lastName = user.last_name;

            if (!firstName && !lastName && user.full_name) {
                const nameParts = user.full_name.split(' ');
                firstName = nameParts[0] || '';
                lastName = nameParts.slice(1).join(' ') || '';
            }

            const newFormData = {
                firstName: firstName || '',
                lastName: lastName || '',
                phone: user.phone || '',
                mobile: user.phone || '', // Usar phone como mobile si no hay mobile específico
                birthDate: user.birth_date || '',
                email: user.email || '',
                newEmail: '',
                confirmEmail: '',
                dni: user.dni || '',
                gender: user.gender || '',
                location: user.location || '',
                acceptPromotional: user.subscription || false
            };

            console.log('FormData a establecer:', newFormData); // Debug log
            setFormData(newFormData);
        }
    }, [user, isLoggedIn, navigate]);

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Preparar datos para enviar al backend
            const updateData: any = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                phone: formData.phone,
                birth_date: formData.birthDate,
                dni: formData.dni,
                gender: formData.gender,
                location: formData.location,
                subscription: formData.acceptPromotional
            };

            // Si hay nuevo email, validar que coincidan
            if (formData.newEmail && formData.newEmail !== formData.confirmEmail) {
                alert('Los emails no coinciden');
                setIsLoading(false);
                return;
            }

            // Agregar email si hay uno nuevo
            if (formData.newEmail) {
                updateData.email = formData.newEmail;
            }

            console.log('Datos a enviar al backend:', updateData); // Debug log

            const response = await UserService.updateProfile(updateData);

            if (response.success) {
                // Actualizar el contexto del usuario
                updateUser(updateData);
                alert('Perfil actualizado correctamente');
            } else {
                alert('Error al actualizar el perfil');
            }
        } catch (error: any) {
            console.error('Error updating profile:', error);
            console.error('Response data:', error.response?.data); // Debug log
            console.error('Response status:', error.response?.status); // Debug log

            if (error.response?.data?.message) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert('Error al actualizar el perfil');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!isLoggedIn) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Redirigiendo...</p>
            </div>
        );
    }

    return (
        <ProfileLayout
            title="Datos personales"
            favoritesCount={favorites.length}
            searchesCount={savedSearches.length}
        >
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
                                placeholder="dd / mm / aaaa"
                                value={formData.birthDate}
                                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                            />
                        </InputWrapper>
                    </FormHalf>
                    <FormHalf>
                        <Label htmlFor="dni">D.N.I</Label>
                        <InputWrapper>
                            <Input
                                type="text"
                                id="dni"
                                placeholder="Ingresar DNI"
                                value={formData.dni}
                                onChange={(e) => handleInputChange('dni', e.target.value)}
                            />
                        </InputWrapper>
                    </FormHalf>
                </FormGrid>

                <FormGrid>
                    <FormHalf>
                        <Label htmlFor="gender">Sexo</Label>
                        <InputWrapper>
                            <Input
                                type="text"
                                id="gender"
                                placeholder="Ingresar sexo"
                                value={formData.gender}
                                onChange={(e) => handleInputChange('gender', e.target.value)}
                            />
                        </InputWrapper>
                    </FormHalf>
                    <FormHalf>
                        <Label htmlFor="location">Localidad</Label>
                        <InputWrapper>
                            <Input
                                type="text"
                                id="location"
                                placeholder="Ingresar localidad"
                                value={formData.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                            />
                        </InputWrapper>
                    </FormHalf>
                </FormGrid>

                <Divider />

                <FormFull>
                    <Label htmlFor="email">Dirección de email</Label>
                    <InputWrapper>
                        <Input
                            type="email"
                            id="email"
                            value={formData.email}
                            disabled
                        />
                    </InputWrapper>
                </FormFull>

                <FormGrid>
                    <FormHalf>
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
                    </FormHalf>
                    <FormHalf>
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
                    </FormHalf>
                </FormGrid>

                <Divider />

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