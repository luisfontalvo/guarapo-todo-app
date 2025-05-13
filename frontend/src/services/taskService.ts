import { isAxiosError } from "axios";

import api from "../config/axios";

export const getTasks = async (listId: string) => {
  try {
    const { data } = await api(`/lists/${listId}/tasks`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const addTask = async (listId: string, title: string) => {
  try {
    const { data } = await api.post(`/lists/${listId}/tasks`, { title });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const completeTask = async (taskId: number, completed: boolean) => {
  try {
    const { data } = await api.put(`/tasks/${taskId}`, { completed });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const { data } = await api.delete(`/tasks/${taskId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
