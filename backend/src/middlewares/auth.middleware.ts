import { APIGatewayProxyEvent } from "aws-lambda";
import { verifyToken } from "../utils/jwt";

export const getUserFromEvent = (event: APIGatewayProxyEvent) => {
  const authHeader = event.headers.Authorization || event.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Token no proporcionado");
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token) as { id: number; email: string };

  return decoded;
};