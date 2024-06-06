import jwt from "jsonwebtoken";
import { Payload } from "../controller/Payload";
const User = require("../../../../models/User.model");
import { ICreateUserRequest } from "../controller/ICreateUserRequest";
import { ILoginUserRequest } from "../controller/ILoginUserRequest";
const secret = process.env.JWT_SECRET || "secret";

const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, secret, {
    expiresIn: "1d",
  });
};
export class UserRepository {
  async getAllUserData() {
    const data = await User.find();
    return data;
  }
  async createUserData(userData: ICreateUserRequest) {
    try {
      const findUser = await User.findOne({ email: userData.email });
      if (!findUser) {
        const createUser = await User.create(userData);
        return createUser;
      } else {
        return "User already exists";
      }
    } catch (err) {
      throw err;
    }
  }
  async loginUser(userData: ILoginUserRequest) {
    try {
      const findUser = await User.findOne({ email: userData.email });
      if (findUser) {
        const isPasswordMatched = await findUser.isPasswordMatched(
          userData.password
        );
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(
          findUser?.id,
          { refreshToken: refreshToken },
          { new: true }
        );

        if (isPasswordMatched) {
          return { message: "password matched", refreshToken: refreshToken };
        } else {
          return { message: "Invalid password" };
        }
      } else {
        return { message: "User not found" };
      }
    } catch (err) {
      throw err;
    }
  }
  async logoutUser(refreshToken: string) {
    try {
      if (!refreshToken) {
        return "not found token";
      }

      const userData = await User.findOne({ refreshToken });
      if (!userData) {
        return "not found data";
      }

      const updateRefreshToken = await User.findByIdAndUpdate(userData._id, {
        refreshToken: "",
      });

      return "success";
    } catch (err) {
      throw err;
    }
  }

  async refreshTokenUser(refreshToken: string) {
    const decode: Payload = jwt.verify(refreshToken, secret) as Payload;

    if (decode.id) {
      const userData = await User.findOne({ _id: decode.id });
      return userData;
    }
  }
}
