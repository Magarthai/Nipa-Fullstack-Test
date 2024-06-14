import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateRefreshToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1d",
  });
};
