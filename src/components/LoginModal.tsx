import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { userService } from '../modules';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface LoginModalProps {
    isShown: boolean;
    onClose: () => void;
    logOrReg?: string;
}

const ModalOverlay = styled.div<{ isShown: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isShown ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 9999;
  
  /* Asegurar que el modal siempre sea visible */
  @media (max-width: 1180px) {
    display: ${props => props.isShown ? 'flex' : 'none'};
  }
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  max-width: 450px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    width: 85%;
    max-width: 500px;
    margin: 1rem;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    width: 90%;
    max-width: none;
    margin: 1rem;
    border-radius: 10px;
    max-height: 92vh;
  }
  
  @media (max-width: 640px) {
    width: 95%;
    max-width: none;
    margin: 1rem;
    border-radius: 8px;
    max-height: 95vh;
  }
  
  @media (max-width: 480px) {
    width: 98%;
    margin: 0.5rem;
    border-radius: 6px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  z-index: 10;
  
  &:hover {
    color: #333;
  }
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    top: 15px;
    right: 15px;
    font-size: 22px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    top: 14px;
    right: 14px;
    font-size: 20px;
  }
  
  @media (max-width: 640px) {
    top: 14px;
    right: 14px;
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    top: 12px;
    right: 12px;
    font-size: 18px;
  }
`;

const ModalHeader = styled.div`
  text-align: center;
  padding: 24px 24px 0 24px;
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    padding: 22px 22px 0 22px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    padding: 20px 20px 0 20px;
  }
  
  @media (max-width: 640px) {
    padding: 20px 20px 0 20px;
  }
  
  @media (max-width: 480px) {
    padding: 16px 16px 0 16px;
  }
`;

const Brand = styled.img`
  height: 40px;
  margin: 0 auto;
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    height: 38px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    height: 36px;
  }
  
  @media (max-width: 640px) {
    height: 36px;
  }
  
  @media (max-width: 480px) {
    height: 32px;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    padding: 22px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    padding: 20px;
  }
  
  @media (max-width: 640px) {
    padding: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const TabsWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    margin-bottom: 22px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
  
  @media (max-width: 640px) {
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 18px;
  }
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? '#059669' : '#6b7280'};
  border-bottom: 2px solid ${props => props.active ? '#059669' : 'transparent'};
  transition: all 0.2s;
  
  &:hover {
    color: #059669;
  }
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    padding: 11px;
    font-size: 15px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    padding: 10px;
    font-size: 15px;
  }
  
  @media (max-width: 640px) {
    padding: 10px;
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    gap: 15px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    gap: 14px;
  }
  
  @media (max-width: 640px) {
    gap: 14px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${props => props.error ? '#ef4444' : '#d1d5db'};
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #059669;
    box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    padding: 11px 15px;
    font-size: 15px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 16px; /* Evitar zoom en iOS */
  }
  
  @media (max-width: 640px) {
    padding: 10px 14px;
    font-size: 16px; /* Evitar zoom en iOS */
  }
  
  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 16px;
  }
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    font-size: 12px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    font-size: 11px;
  }
  
  @media (max-width: 640px) {
    font-size: 11px;
  }
  
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: linear-gradient(to right, #059669, #10b981);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
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
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    padding: 11px 15px;
    font-size: 15px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 16px;
  }
  
  @media (max-width: 640px) {
    padding: 10px 14px;
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 16px;
  }
`;

const SessionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  font-size: 14px;
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    margin: 15px 0;
    font-size: 14px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    margin: 14px 0;
    font-size: 13px;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
  
  @media (max-width: 640px) {
    margin: 14px 0;
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    margin: 12px 0;
    font-size: 12px;
  }
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #6b7280;
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    font-size: 14px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    font-size: 13px;
    gap: 6px;
  }
  
  @media (max-width: 640px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    gap: 5px;
  }
`;

const ForgotPassword = styled.a`
  color: #059669;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    font-size: 14px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    font-size: 13px;
  }
  
  @media (max-width: 640px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const SocialSection = styled.div`
  margin-top: 24px;
  text-align: center;
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    margin-top: 22px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    margin-top: 20px;
  }
  
  @media (max-width: 640px) {
    margin-top: 20px;
  }
  
  @media (max-width: 480px) {
    margin-top: 18px;
  }
`;

const SocialTitle = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 16px;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background: #e5e7eb;
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    font-size: 14px;
    margin-bottom: 15px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 14px;
  }
  
  @media (max-width: 640px) {
    font-size: 13px;
    margin-bottom: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 12px;
  }
`;

const SocialButton = styled.button<{ variant: 'google' | 'facebook' }>`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: ${props => props.variant === 'google' ? 'white' : '#1877f2'};
  color: ${props => props.variant === 'google' ? '#374151' : 'white'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.variant === 'google' ? '#f9fafb' : '#166fe5'};
    transform: translateY(-1px);
  }
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    padding: 11px 15px;
    font-size: 14px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 14px;
  }
  
  @media (max-width: 640px) {
    padding: 10px 14px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

const SocialIcon = styled.img`
  width: 20px;
  height: 20px;
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    width: 19px;
    height: 19px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }
  
  @media (max-width: 640px) {
    width: 18px;
    height: 18px;
  }
  
  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`;

const FeedbackMessage = styled.div<{ type: 'error' | 'success' }>`
  padding: 12px;
  border-radius: 8px;
  margin: 16px 0;
  font-size: 14px;
  background: ${props => props.type === 'error' ? '#fef2f2' : '#f0fdf4'};
  color: ${props => props.type === 'error' ? '#dc2626' : '#059669'};
  border: 1px solid ${props => props.type === 'error' ? '#fecaca' : '#bbf7d0'};
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    padding: 11px;
    margin: 15px 0;
    font-size: 14px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    padding: 10px;
    margin: 14px 0;
    font-size: 13px;
  }
  
  @media (max-width: 640px) {
    padding: 10px;
    margin: 14px 0;
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    padding: 8px;
    margin: 12px 0;
    font-size: 12px;
  }
`;

const FooterText = styled.p`
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  margin-top: 16px;
  line-height: 1.5;
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    font-size: 12px;
    margin-top: 15px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    font-size: 11px;
    margin-top: 14px;
  }
  
  @media (max-width: 640px) {
    font-size: 11px;
    margin-top: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 12px;
  }
`;

const FooterLink = styled.a`
  color: #059669;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
  
  /* Responsive para tablets */
  @media (max-width: 1180px) {
    font-size: 12px;
  }
  
  /* Responsive para móvil */
  @media (max-width: 768px) {
    font-size: 11px;
  }
  
  @media (max-width: 640px) {
    font-size: 11px;
  }
  
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const LoginModal: React.FC<LoginModalProps> = ({
    isShown,
    onClose,
    logOrReg = 'login'
}) => {
    const { login, register, googleLogin } = useUser();
    const navigate = useNavigate();
    const [content, setContent] = useState<'login' | 'register'>(logOrReg as 'login' | 'register');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'success', message: string } | null>(null);

    useEffect(() => {
        setContent(logOrReg as 'login' | 'register');
    }, [logOrReg]);

    const handleTabChange = (tab: 'login' | 'register') => {
        setContent(tab);
        setErrors({});
        setFeedbackMessage(null);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.email) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El email no es válido';
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        }

        if (content === 'register') {
            if (!formData.fullName) {
                newErrors.fullName = 'El nombre completo es requerido';
            }

            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Las contraseñas no coinciden';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Función para normalizar el usuario del backend al formato esperado por el contexto
    const normalizeUser = (rawUser: any) => {
        console.log('Usuario raw del backend:', rawUser); // Debug log

        return {
            id: rawUser.id || rawUser.pk || rawUser.user_id || 0,
            full_name: rawUser.full_name || rawUser.fullName || rawUser.name || '',
            first_name: rawUser.first_name || rawUser.firstName || '',
            last_name: rawUser.last_name || rawUser.lastName || '',
            username: rawUser.username || rawUser.email || '',
            email: rawUser.email || '',
            type_id: rawUser.type_id || rawUser.typeId || '0000',
            gender: rawUser.gender || 'masculino',
            location: rawUser.location || '',
            phone: rawUser.phone || rawUser.mobile || '',
            dni: rawUser.dni || '',
            birth_date: rawUser.birth_date || rawUser.birthDate || '',
            subscription: rawUser.subscription || rawUser.acceptPromotional || false
        };
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setFeedbackMessage(null);

        try {
            console.log('🔐 Iniciando login con:', formData.email);

            // Usar solo la función del contexto, que ya maneja la llamada al backend
            await login(formData.email, formData.password);

            console.log('✅ Login exitoso, redirigiendo a página principal...');
            setFeedbackMessage({ type: 'success', message: 'Login exitoso! Redirigiendo...' });

            // Solo cerrar el modal después del login exitoso
            setTimeout(() => {
                console.log('🚀 Login exitoso, cerrando modal...');
                onClose(); // Solo cerrar el modal, no navegar
            }, 1500);
        } catch (error: any) {
            setFeedbackMessage({
                type: 'error',
                message: error.response?.data?.message || 'Error en el login'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setFeedbackMessage(null);

        try {
            console.log('📝 Iniciando registro con:', formData.email);

            // Usar solo la función del contexto, que ya maneja la llamada al backend
            await register({
                fullName: formData.fullName,
                username: formData.email,
                password: formData.password,
                passwordB: formData.password
            });

            console.log('✅ Registro exitoso, redirigiendo a página principal...');
            setFeedbackMessage({ type: 'success', message: 'Registro exitoso! Redirigiendo...' });

            // Solo cerrar el modal después del registro exitoso
            setTimeout(() => {
                console.log('🚀 Registro exitoso, cerrando modal...');
                onClose(); // Solo cerrar el modal, no navegar
            }, 1500);
        } catch (error: any) {
            setFeedbackMessage({
                type: 'error',
                message: error.response?.data?.message || 'Error en el registro'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const googleOAuthLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                console.log('🔐 Iniciando login con Google...');

                // Usar solo la función del contexto
                await googleLogin({ token: tokenResponse.access_token });

                console.log('✅ Login con Google exitoso, redirigiendo a página principal...');
                setFeedbackMessage({ type: 'success', message: 'Login con Google exitoso! Redirigiendo...' });

                // Redirigir a la página principal después del login exitoso
                setTimeout(() => {
                    console.log('🚀 Redirigiendo a página principal...');
                    onClose(); // Cerrar el modal primero
                    navigate('/'); // Usar React Router para navegar
                }, 1500);
            } catch (error: any) {
                setFeedbackMessage({
                    type: 'error',
                    message: error.response?.data?.message || 'Error en el login con Google'
                });
            }
        },
        onError: () => {
            setFeedbackMessage({
                type: 'error',
                message: 'Error en el login con Google'
            });
        }
    });

    const handleFacebookLogin = async () => {
        // Para Facebook necesitarías implementar el SDK de Facebook
        // Por ahora mostramos un mensaje de error
        setFeedbackMessage({
            type: 'error',
            message: 'Login con Facebook no disponible en esta versión'
        });
    };

    if (!isShown) return null;

    return (
        <ModalOverlay isShown={isShown} onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>×</CloseButton>

                <ModalHeader>
                    <Brand src="/mel_logo_login.png" alt="Mel Propiedades" />
                </ModalHeader>

                <ModalBody>
                    <TabsWrapper>
                        <Tab
                            active={content === 'login'}
                            onClick={() => handleTabChange('login')}
                        >
                            Ingresar
                        </Tab>
                        <Tab
                            active={content === 'register'}
                            onClick={() => handleTabChange('register')}
                        >
                            Crear cuenta
                        </Tab>
                    </TabsWrapper>

                    {feedbackMessage && (
                        <FeedbackMessage type={feedbackMessage.type}>
                            {feedbackMessage.message}
                        </FeedbackMessage>
                    )}

                    {content === 'login' && (
                        <Form onSubmit={handleLogin}>
                            <div>
                                <Input
                                    type="email"
                                    placeholder="Ingresa tu e-mail"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    error={!!errors.email}
                                />
                                {errors.email && <ErrorText>{errors.email}</ErrorText>}
                            </div>

                            <div>
                                <Input
                                    type="password"
                                    placeholder="Ingresa tu clave"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    error={!!errors.password}
                                />
                                {errors.password && <ErrorText>{errors.password}</ErrorText>}
                            </div>

                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Ingresando...' : 'Ingresar'}
                            </Button>

                            <SessionWrapper>
                                <CheckboxWrapper>
                                    <input type="checkbox" id="remember" />
                                    <span>Mantener sesión iniciada</span>
                                </CheckboxWrapper>
                                <ForgotPassword href="#">¿Olvidaste tu contraseña?</ForgotPassword>
                            </SessionWrapper>
                        </Form>
                    )}

                    {content === 'register' && (
                        <Form onSubmit={handleRegister}>
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Ingresa nombre y apellido"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    error={!!errors.fullName}
                                />
                                {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
                            </div>

                            <div>
                                <Input
                                    type="email"
                                    placeholder="Ingresa tu e-mail"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    error={!!errors.email}
                                />
                                {errors.email && <ErrorText>{errors.email}</ErrorText>}
                            </div>

                            <div>
                                <Input
                                    type="password"
                                    placeholder="Ingresa tu clave"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    error={!!errors.password}
                                />
                                {errors.password && <ErrorText>{errors.password}</ErrorText>}
                            </div>

                            <div>
                                <Input
                                    type="password"
                                    placeholder="Repite tu clave"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    error={!!errors.confirmPassword}
                                />
                                {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
                            </div>

                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Creando cuenta...' : 'Crear una cuenta'}
                            </Button>

                            <FooterText>
                                Al hacer click en el botón estás aceptando los{' '}
                                <FooterLink href="#">Términos y condiciones</FooterLink>
                            </FooterText>
                        </Form>
                    )}

                    <SocialSection>
                        <SocialTitle>O también puedes:</SocialTitle>

                        <SocialButton
                            variant="google"
                            onClick={() => googleOAuthLogin()}
                            type="button"
                        >
                            <SocialIcon src="/google_logo.png" alt="Google" />
                            Continuar con Google
                        </SocialButton>

                        <SocialButton
                            variant="facebook"
                            onClick={handleFacebookLogin}
                            type="button"
                        >
                            <SocialIcon src="/fb_logo.png" alt="Facebook" />
                            Continuar con Facebook
                        </SocialButton>
                    </SocialSection>
                </ModalBody>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default LoginModal; 