// src/types/user.ts
export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
}

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
}
