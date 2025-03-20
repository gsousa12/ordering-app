export interface IJwtPayload {
  userId: string;
  email: string;
  status: number;
  role: number;
  iat: number;
  exp: number;
}
