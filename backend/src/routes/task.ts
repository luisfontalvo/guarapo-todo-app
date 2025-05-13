import { getTasks, addTask, completeTask, deleteTask } from "../controllers/task.controller";

export const getTasksHandler = getTasks;
export const addTaskHandler = addTask;
export const completeTaskHandler = completeTask;
export const deleteTaskHandler = deleteTask;