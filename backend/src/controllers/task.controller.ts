import { APIGatewayProxyHandler } from "aws-lambda";
import { PrismaClient } from "@prisma/client";
import { getUserFromEvent } from "../middlewares/auth.middleware";

const prisma = new PrismaClient();

export const getTasks: APIGatewayProxyHandler = async (event) => {
  try {
    const { id: userId } = getUserFromEvent(event);
    const listId = parseInt(event.pathParameters!.id!);

    const tasks = await prisma.task.findMany({
      where: { listId, list: { userId } },
    });

    return { statusCode: 200, body: JSON.stringify(tasks) };
  } catch {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "No autorizado" }),
    };
  }
};

export const addTask: APIGatewayProxyHandler = async (event) => {
  try {
    const { id: userId } = getUserFromEvent(event);
    const listId = parseInt(event.pathParameters!.id!);
    const { title } = JSON.parse(event.body!);

    const task = await prisma.task.create({
      data: { title, listId },
    });

    return { statusCode: 201, body: JSON.stringify(task) };
  } catch {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "No autorizado" }),
    };
  }
};

export const completeTask: APIGatewayProxyHandler = async (event) => {
  const taskId = parseInt(event.pathParameters!.id!);
  const { completed } = JSON.parse(event.body!);

  const updated = await prisma.task.update({
    where: { id: taskId },
    data: { completed },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(updated),
  };
};

export const deleteTask: APIGatewayProxyHandler = async (event) => {
  const taskId = parseInt(event.pathParameters!.id!);

  await prisma.task.delete({ where: { id: taskId } });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Tarea eliminada" }),
  };
};
