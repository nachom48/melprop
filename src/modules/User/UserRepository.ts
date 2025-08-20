// =====================================================
// USER MODULE - REPOSITORY LAYER
// =====================================================

import { getApiUrl } from '../../config';
import { axiosInstance } from '../../config/axios';
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

// La configuración de cookies ya está en axiosInstance

export class UserRepository {

  // =====================================================
  // AUTHENTICATION METHODS
  // =====================================================

  /**
   * Login de usuario con credenciales
   */
  async login(credentials: LoginUserDTO): Promise<LoginResponseDTO> {
    try {
      const response = await axiosInstance.post(getApiUrl('LOGIN'), credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en el login');
    }
  }

  /**
   * Registro de nuevo usuario
   */
  async signup(userData: CreateUserDTO): Promise<LoginResponseDTO> {
    try {
      const response = await axiosInstance.post(getApiUrl('SIGNUP'), userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en el registro');
    }
  }

  /**
   * Verificar si el usuario está logueado
   */
  async checkUserLogged(): Promise<CheckUserResponseDTO> {
    try {
      const response = await axiosInstance.post(getApiUrl('ME'), {});
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error verificando usuario');
    }
  }

  /**
   * Logout del usuario
   */
  async logout(): Promise<ApiResponseDTO> {
    try {
      const response = await axiosInstance.post(getApiUrl('LOGOUT'), {});
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en el logout');
    }
  }

  /**
   * Login con Google OAuth
   */
  async googleLogin(tokenData: GoogleLoginDTO): Promise<LoginResponseDTO> {
    try {
      const response = await axiosInstance.post(getApiUrl('LOGIN_GOOGLE'), tokenData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en login con Google');
    }
  }

  /**
   * Login con Facebook OAuth
   */
  async facebookLogin(userData: FacebookLoginDTO): Promise<LoginResponseDTO> {
    try {
      const response = await axiosInstance.post(getApiUrl('LOGIN_FACEBOOK'), userData);
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
  async updateProfile(userData: UpdateUserDTO): Promise<ApiResponseDTO<UserResponseDTO>> {
    try {
      const response = await axiosInstance.patch(getApiUrl('ME'), userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error actualizando perfil');
    }
  }

  /**
   * Cambiar contraseña del usuario
   */
  async changePassword(passwordData: ChangePasswordDTO): Promise<ApiResponseDTO> {
    try {
      const response = await axiosInstance.post(getApiUrl('CHANGE_PASSWORD'), passwordData);
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
  async forgotPassword(emailData: ForgotPasswordDTO): Promise<ApiResponseDTO> {
    try {
      const response = await axiosInstance.post(getApiUrl('FORGOT_PASSWORD'), emailData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error solicitando recuperación');
    }
  }

  /**
   * Establecer nueva contraseña con token
   */
  async resetPassword(resetData: ResetPasswordDTO): Promise<ApiResponseDTO> {
    try {
      const response = await axiosInstance.post(`${getApiUrl('SET_PASSWORD')}${resetData.uidb64}/${resetData.token}/`, resetData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error estableciendo nueva contraseña');
    }
  }

  /**
   * Validar token de recuperación
   */
  async validateToken(tokenData: TokenValidatorDTO): Promise<ApiResponseDTO> {
    try {
      const response = await axiosInstance.post(`${getApiUrl('TOKEN_VALIDATOR')}${tokenData.uidb64}/${tokenData.token}/`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error validando token');
    }
  }
}

// Exportar instancia singleton
export const userRepository = new UserRepository();
