import { isAxiosError } from "axios";

import api from "../config/axios";

export const getLists = async () => {
  try {
    const { data } = await api("/lists");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const createList = async (title: string) => {
  try {
    const { data } = await api.post("/lists", { title });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
