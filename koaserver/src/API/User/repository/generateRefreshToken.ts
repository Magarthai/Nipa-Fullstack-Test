import jwt from "jsonwebtoken";
import { secret } from "./UserRepository";

export const generateRefreshToken = (id: number) => {
  return jwt.sign({ id }, secret, {
    expiresIn: "1d",
  });
};
