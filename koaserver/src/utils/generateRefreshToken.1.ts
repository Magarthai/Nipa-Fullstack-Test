import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
export const generateRefreshToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "999999999999d",
  });
};

const a = generateRefreshToken(1);
console.log(a);
