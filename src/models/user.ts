interface IUser extends IUserRole {
  email: string;
  password: string;
  name: string;
  id: string | null;
  isActivated: boolean;
}

interface IUserRole {
  role: 'ADMIN' | 'USER';
}
interface ITokens {
  accessToken: string;
  refreshToken: string;
}

//RESPONSE

interface IUserResponse extends ITokens {
  user: IUser;
}
interface ILogoutResponse {
  acknowledged: boolean;
  deletedCount: number;
}

//REQUESTS

interface LoginRequest {
  email: string;
  password: string;
}
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export type {
  IUser,
  IUserRole,
  ITokens,
  RegisterRequest,
  LoginRequest,
  IUserResponse,
  ILogoutResponse,
};
