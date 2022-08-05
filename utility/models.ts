export interface User {
  id: number;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNum?: number;
}

export interface SessionUser{
  id: number;
  username: string;
  identity: string;
}