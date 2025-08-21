// =====================================================
// USER MODULE - SERVICE LAYER
// =====================================================

import { UserRepository } from './UserRepository';
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

export namespace UserService {

  // =====================================================
  // AUTHENTICATION METHODS
  // =====================================================

  /**
   * Login de usuario con credenciales
   */
  export async function login(credentials: LoginUserDTO): Promise<LoginResponseDTO> {
    try {
      const response = await UserRepository.login(credentials);
      return response;
    } catch (error: any) {
      throw new Error(`Error en el servicio de login: ${error.message}`);
    }
  }

  /**
   * Registro de nuevo usuario
   */
  export async function signup(userData: CreateUserDTO): Promise<LoginResponseDTO> {
    try {
      const response = await UserRepository.signup(userData);
      return response;
    } catch (error: any) {
      throw new Error(`Error en el servicio de registro: ${error.message}`);
    }
  }

  /**
   * Verificar si el usuario está logueado
   */
  export async function checkUserLogged(): Promise<CheckUserResponseDTO> {
    try {
      const response = await UserRepository.checkUserLogged();
      return response;
    } catch (error: any) {
      throw new Error(`Error en el servicio de verificación: ${error.message}`);
    }
  }

  /**
   * Logout del usuario
   */
  export async function logout(): Promise<ApiResponseDTO> {
    try {
      const response = await UserRepository.logout();
      return response;
    } catch (error: any) {
      throw new Error(`Error en el servicio de logout: ${error.message}`);
    }
  }

  /**
   * Login con Google OAuth
   */
  export async function googleLogin(tokenData: GoogleLoginDTO): Promise<LoginResponseDTO> {
    try {
      const response = await UserRepository.googleLogin(tokenData);
      return response;
    } catch (error: any) {
      throw new Error(`Error en el servicio de login con Google: ${error.message}`);
    }
  }

  /**
   * Login con Facebook OAuth
   */
  export async function facebookLogin(userData: FacebookLoginDTO): Promise<LoginResponseDTO> {
    try {
      const response = await UserRepository.facebookLogin(userData);
      return response;
    } catch (error: any) {
      throw new Error(`Error en el servicio de login con Facebook: ${error.message}`);
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
      const response = await UserRepository.updateProfile(userData);
      return response;
    } catch (error: any) {
      throw new Error(`Error en el servicio de actualización de perfil: ${error.message}`);
    }
  }

  /**
   * Cambiar contraseña del usuario
   */
  export async function changePassword(passwordData: ChangePasswordDTO): Promise<ApiResponseDTO> {
    try {
      const response = await UserRepository.changePassword(passwordData);
      return response;
    } catch (error: any) {
      throw new Error(`Error en el servicio de cambio de contraseña: ${error.message}`);
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
      const response = await UserRepository.forgotPassword(emailData);
      return response;
    } catch (error: any) {
      throw new Error(`Error en el servicio de recuperación de contraseña: ${error.message}`);
    }
  }

  /**
   * Establecer nueva contraseña con token
   */
  export async function resetPassword(resetData: ResetPasswordDTO): Promise<ApiResponseDTO> {
    try {
      const response = await UserRepository.resetPassword(resetData);
      return response;
    } catch (error: any) {
      throw new Error(`Error en el servicio de reset de contraseña: ${error.message}`);
    }
  }

  /**
   * Validar token de recuperación
   */
  export async function validateToken(tokenData: TokenValidatorDTO): Promise<ApiResponseDTO> {
    try {
      const response = await UserRepository.validateToken(tokenData);
      return response;
    } catch (error: any) {
      throw new Error(`Error en el servicio de validación de token: ${error.message}`);
    }
  }

  // =====================================================
  // UTILITY METHODS
  // =====================================================

  /**
   * Normalizar usuario del backend al formato esperado
   */
  export function normalizeUser(rawUser: any): UserResponseDTO {
    return {
      id: rawUser.id || rawUser.pk || rawUser.user_id || 0,
      full_name: rawUser.full_name || rawUser.fullName || rawUser.name || '',
      first_name: rawUser.first_name || rawUser.firstName || '',
      last_name: rawUser.last_name || rawUser.lastName || '',
      username: rawUser.username || rawUser.email || '',
      email: rawUser.email || '',
      email_subscription: rawUser.email_subscription || rawUser.subscription || rawUser.acceptPromotional || false,
      type_id: rawUser.type_id || rawUser.typeId || '0000',
      gender: rawUser.gender || 'masculino',
      location: rawUser.location || '',
      phone: rawUser.phone || rawUser.mobile || '',
      dni: rawUser.dni || '',
      birth_date: rawUser.birth_date || rawUser.birthDate || '',
      subscription: rawUser.email_subscription || rawUser.subscription || rawUser.acceptPromotional || false
    };
  }

  /**
   * Validar si el usuario está autenticado
   */
  export function isUserAuthenticated(user: UserResponseDTO | null): boolean {
    return user !== null && user.id > 0;
  }

  /**
   * Obtener nombre completo del usuario
   */
  export function getUserFullName(user: UserResponseDTO | null): string {
    if (!user) return '';
    if (user.full_name) return user.full_name;
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user.username || user.email || 'Usuario';
  }
}
