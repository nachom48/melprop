import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { googleSignIn, facebookSignIn, loginWithCredentials, registerUser } from '../services/auth';
import { useUser } from '../context/UserContext';
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
`;

const ModalHeader = styled.div`
  text-align: center;
  padding: 24px 24px 0 24px;
`;

const Brand = styled.img`
  height: 40px;
  margin: 0 auto;
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const TabsWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
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
`;

const SessionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  font-size: 14px;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #6b7280;
`;

const ForgotPassword = styled.a`
  color: #059669;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SocialSection = styled.div`
  margin-top: 24px;
  text-align: center;
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
`;

const SocialIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const FeedbackMessage = styled.div<{ type: 'error' | 'success' }>`
  padding: 12px;
  border-radius: 8px;
  margin: 16px 0;
  font-size: 14px;
  background: ${props => props.type === 'error' ? '#fef2f2' : '#f0fdf4'};
  color: ${props => props.type === 'error' ? '#dc2626' : '#059669'};
  border: 1px solid ${props => props.type === 'error' ? '#fecaca' : '#bbf7d0'};
`;

const FooterText = styled.p`
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  margin-top: 16px;
  line-height: 1.5;
`;

const FooterLink = styled.a`
  color: #059669;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginModal: React.FC<LoginModalProps> = ({
    isShown,
    onClose,
    logOrReg = 'login'
}) => {
    const { login } = useUser();
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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setFeedbackMessage(null);

        try {
            const response = await loginWithCredentials(formData.email, formData.password);
            if (response.data.user) {
                setFeedbackMessage({ type: 'success', message: 'Login exitoso!' });
                // Guardar el usuario en el contexto y redirigir
                login(response.data.user);
                setTimeout(() => onClose(), 1000);
            }
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
            const response = await registerUser(
                formData.fullName,
                formData.email,
                formData.password,
                formData.password
            );
            if (response.user) {
                setFeedbackMessage({ type: 'success', message: 'Registro exitoso!' });
                // Guardar el usuario en el contexto y redirigir
                login(response.user);
                setTimeout(() => onClose(), 1000);
            }
        } catch (error: any) {
            setFeedbackMessage({
                type: 'error',
                message: error.response?.data?.message || 'Error en el registro'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await googleSignIn({ token: tokenResponse.access_token });
                const rawUser = response.user || response.data?.user;
                if (rawUser) {
                    const normalizedUser = {
                        id: rawUser.id ?? rawUser.pk ?? rawUser.user_id,
                        fullName: rawUser.fullName ?? rawUser.full_name ?? rawUser.name ?? '',
                        email: rawUser.email ?? rawUser.username ?? '',
                        phone: rawUser.phone ?? rawUser.mobile ?? undefined,
                        birthDate: rawUser.birthDate ?? rawUser.birth_date ?? undefined,
                        acceptPromotional: rawUser.acceptPromotional ?? rawUser.accept_promotional ?? undefined,
                    } as any;
                    setFeedbackMessage({ type: 'success', message: 'Login con Google exitoso!' });
                    // Guardar el usuario en el contexto y redirigir
                    login(normalizedUser);
                    // Redirigir a datos personales (perfil)
                    setTimeout(() => onClose(), 300);
                }
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
                            onClick={() => googleLogin()}
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