import { isAxiosError } from "axios";

import api from "../config/axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data.token;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/register", { email, password });
    return response.data.token;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
