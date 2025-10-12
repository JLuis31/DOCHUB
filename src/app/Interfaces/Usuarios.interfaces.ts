export interface Usuario {
  nombre: string;
  email: string;
  password: string;
  refreshToken?: string;
  refreshTokenExpiryTime?: Date;
}
