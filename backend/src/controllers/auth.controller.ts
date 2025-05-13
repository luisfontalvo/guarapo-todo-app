import { APIGatewayProxyHandler } from "aws-lambda";
import { createUser, findUserByEmail } from "../services/user.service";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcryptjs";

export const register: APIGatewayProxyHandler = async (event) => {
  const { email, password } = JSON.parse(event.body!);
  const user = await findUserByEmail(email);
  if (user) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Usuario ya existe" }),
    };
  }

  const newUser = await createUser(email, password);
  const token = generateToken({ id: newUser.id, email: newUser.email });

  return {
    statusCode: 201,
    body: JSON.stringify({ token }),
  };
};

export const login: APIGatewayProxyHandler = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body || "{}");

    const user = await findUserByEmail(email);
    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Usuario no encontrado" }),
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Contraseña incorrecta" }),
      };
    }

    const token = generateToken({ id: user.id, email: user.email });

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    console.error("Error en login:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error interno del servidor" }),
    };
  }
};
