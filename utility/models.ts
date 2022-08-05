export interface User {
  id: number;
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_num?: number;
}

export interface SessionUser{
  id: number;
  username: string;
  identity: string;
}