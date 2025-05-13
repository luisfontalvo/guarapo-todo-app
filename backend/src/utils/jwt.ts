import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};