import axios from "axios";
import { IUser, CreateUserPayload } from "../types/user";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
console.log("baseurl:", process.env.NEXT_PUBLIC_API_BASE_URL);

export const getUsers = async (): Promise<IUser[]> => {
  const { data } = await api.get("/users");
  return data;
};

export const createUser = async (
  payload: CreateUserPayload
): Promise<IUser> => {
  const { data } = await api.post("/users", payload);

  return data;
};
