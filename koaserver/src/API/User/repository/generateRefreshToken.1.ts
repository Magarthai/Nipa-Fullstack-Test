import jwt from "jsonwebtoken";
export const generateRefreshToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1d",
  });
};
