// =====================================================
// USER MODULE - DATA TRANSFER OBJECTS
// =====================================================

// =====================================================
// REQUEST DTOs
// =====================================================

export interface CreateUserDTO {
    fullName: string;
    username: string;
    password: string;
    passwordB: string;
}

export interface LoginUserDTO {
    username: string; // Backend expects 'username' not 'email'
    password: string;
}

export interface UpdateUserDTO {
    first_name: string;
    last_name: string;
    phone: string;
    birth_date: string;
    dni: string;
    gender: string;
    location: string;
    subscription: boolean;
    email?: string; // Optional for email updates
}

export interface ChangePasswordDTO {
    current_password: string;
    new_password: string;
    new_password_b: string; // Backend expects this field name
}

export interface ForgotPasswordDTO {
    email: string;
}

export interface ResetPasswordDTO {
    uidb64: string;
    token: string;
    new_password: string;
    new_password_b: string;
}

export interface GoogleLoginDTO {
    token: string;
}

export interface FacebookLoginDTO {
    email: string;
    id: string;
    name: string;
}

export interface TokenValidatorDTO {
    uidb64: string;
    token: string;
}

// =====================================================
// RESPONSE DTOs
// =====================================================

export interface UserResponseDTO {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    birth_date: string;
    email_subscription: boolean; // Backend field name
    username: string;
    first_name: string;
    last_name: string;
    type_id: string;
    gender: string;
    location: string;
    dni: string;
    subscription: boolean; // Alias for email_subscription
}

export interface LoginResponseDTO {
    user: UserResponseDTO;
    message?: string;
}

export interface CheckUserResponseDTO {
    isLogged: boolean;
    user: UserResponseDTO;
}

export interface ChangePasswordResponseDTO {
    message: string;
    success: boolean;
}

export interface GoogleLoginDTO {
    token: string;
}

export interface FacebookLoginDTO {
    email: string;
    id: string;
    name: string;
}

// Generic API response wrapper
export interface ApiResponseDTO<T = any> {
    data?: T;
    message?: string;
    success?: boolean;
    user?: T; // For user-related responses
}

export interface ErrorResponseDTO {
    message: string;
    code: string;
    status: number;
}

// =====================================================
// STORE DTOs (para el contexto)
// =====================================================

export interface UserStoreDTO {
    user: UserResponseDTO | null;
    isLoggedIn: boolean;
    favorites: any[];
    savedSearches: any[];
}

// =====================================================
// UTILITY TYPES
// =====================================================

export enum UserState {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended'
}

export enum UserStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
    AWAY = 'away'
}
