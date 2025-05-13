import { APIGatewayProxyHandler } from "aws-lambda";
import { PrismaClient } from "@prisma/client";
import { getUserFromEvent } from "../middlewares/auth.middleware";

const prisma = new PrismaClient();

export const createList: APIGatewayProxyHandler = async (event) => {
  try {
    const { id: userId } = getUserFromEvent(event);
    const { title } = JSON.parse(event.body!);

    const newList = await prisma.list.create({
      data: { title, userId },
    });

    return { statusCode: 201, body: JSON.stringify(newList) };
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "No autorizado" }),
    };
  }
};

export const getLists: APIGatewayProxyHandler = async (event) => {
  try {
    const { id: userId } = getUserFromEvent(event);

    const lists = await prisma.list.findMany({
      where: { userId },
      include: { tasks: true },
    });

    return { statusCode: 200, body: JSON.stringify(lists) };
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "No autorizado" }),
    };
  }
};
