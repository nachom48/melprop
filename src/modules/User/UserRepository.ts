// =====================================================
// USER MODULE - REPOSITORY LAYER
// =====================================================

import { apiClient } from '../../config/axios.config';
import {
  CreateUserDTO,
  LoginUserDTO,
  UpdateUserDTO,
  ChangePasswordDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  GoogleLoginDTO,
  FacebookLoginDTO,
  TokenValidatorDTO,
  LoginResponseDTO,
  CheckUserResponseDTO,
  ApiResponseDTO,
  UserResponseDTO
} from './User.dto';

export namespace UserRepository {

  // =====================================================
  // AUTHENTICATION METHODS
  // =====================================================

  /**
   * Login de usuario con credenciales
   */
  export async function login(credentials: LoginUserDTO): Promise<LoginResponseDTO> {
    try {
      const response = await apiClient.post('/auth/login/', credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en el login');
    }
  }

  /**
   * Registro de nuevo usuario
   */
  export async function signup(userData: CreateUserDTO): Promise<LoginResponseDTO> {
    try {
      const response = await apiClient.post('/auth/signup/', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en el registro');
    }
  }

  /**
   * Verificar si el usuario está logueado
   */
  export async function checkUserLogged(): Promise<CheckUserResponseDTO> {
    try {
      const response = await apiClient.post('/auth/me/', {});
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error verificando usuario');
    }
  }

  /**
   * Logout del usuario
   */
  export async function logout(): Promise<ApiResponseDTO> {
    try {
      const response = await apiClient.post('/auth/logout/', {});
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en el logout');
    }
  }

  /**
   * Login con Google OAuth
   */
  export async function googleLogin(tokenData: GoogleLoginDTO): Promise<LoginResponseDTO> {
    try {
      const response = await apiClient.post('/auth/google-login/', tokenData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en login con Google');
    }
  }

  /**
   * Login con Facebook OAuth
   */
  export async function facebookLogin(userData: FacebookLoginDTO): Promise<LoginResponseDTO> {
    try {
      const response = await apiClient.post('/auth/facebook-login/', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en login con Facebook');
    }
  }

  // =====================================================
  // USER PROFILE METHODS
  // =====================================================

  /**
   * Actualizar datos del perfil del usuario
   */
  export async function updateProfile(userData: UpdateUserDTO): Promise<ApiResponseDTO<UserResponseDTO>> {
    try {
      const response = await apiClient.patch('/auth/me/', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error actualizando perfil');
    }
  }

  /**
   * Cambiar contraseña del usuario
   */
  export async function changePassword(passwordData: ChangePasswordDTO): Promise<ApiResponseDTO> {
    try {
      const response = await apiClient.post('/auth/change-password/', passwordData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error cambiando contraseña');
    }
  }

  // =====================================================
  // PASSWORD RECOVERY METHODS
  // =====================================================

  /**
   * Solicitar recuperación de contraseña
   */
  export async function forgotPassword(emailData: ForgotPasswordDTO): Promise<ApiResponseDTO> {
    try {
      const response = await apiClient.post('/auth/forgot-password/', emailData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error solicitando recuperación');
    }
  }

  /**
   * Establecer nueva contraseña con token
   */
  export async function resetPassword(resetData: ResetPasswordDTO): Promise<ApiResponseDTO> {
    try {
      const response = await apiClient.post(`/auth/set-password/${resetData.uidb64}/${resetData.token}/`, resetData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error estableciendo nueva contraseña');
    }
  }

  /**
   * Validar token de recuperación
   */
  export async function validateToken(tokenData: TokenValidatorDTO): Promise<ApiResponseDTO> {
    try {
      const response = await apiClient.post(`/auth/token-validator/${tokenData.uidb64}/${tokenData.token}/`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error validando token');
    }
  }
}
