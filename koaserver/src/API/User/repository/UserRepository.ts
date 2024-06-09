import { Service } from "typedi";
import bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
import db from "../../../db/db";
import { Knex } from "knex";
import { ICreateUserRequest } from "./ICreateUserRequest";
import { UserDataListReturn } from "./UserDataListReturn";
import { Payload } from "./Payload";
import { ILoginUserRequest } from "./ILoginUserRequest";
import { secret } from "./secret";
const generateRefreshToken = (id: number) => {
  return jwt.sign({ id }, secret, {
    expiresIn: "1d",
  });
};

@Service()
export class UserRepository {
  private db: Knex.QueryBuilder;
  async listAllUserData() {
    const data = await db("user");
    return data;
  }
  async createUserData(userData: ICreateUserRequest) {
    try {
      const findExitEmail = await db("user")
        .where("email", userData.email)
        .first();
      if (findExitEmail) {
        console.log(findExitEmail);
        return "User already exists";
      } else {
        const salt = bcrypt.genSaltSync(10);
        const password: any = userData.password;
        const hash = bcrypt.hashSync(password, salt);
        const encryptedData = {
          fname: userData.fname,
          lname: userData.lname,
          email: userData.email,
          password: hash,
        };
        const selectUserData = await db("user")
          .insert([encryptedData])
          .returning(UserDataListReturn);
        return selectUserData;
      }
    } catch (err) {
      throw err;
    }
  }
  async loginUser(userData: ILoginUserRequest) {
    try {
      const findUser = await db("user").where("email", userData.email);
      console.log(findUser);

      const user = findUser[0];
      if (user) {
        const isPasswordMatched = await bcrypt.compare(
          userData.password,
          user.password
        );
        console.log(user);
        if (isPasswordMatched) {
          const refreshToken = await generateRefreshToken(user?.id);
          const updateUser = await db("user").where({ id: user.id }).update({
            refreshToken: refreshToken,
            updated_at: db.fn.now(),
          });
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
      const userData = await db("user")
        .where("refreshToken", refreshToken)
        .first();
      if (!userData) {
        return "not found data";
      }

      const updateRefreshToken = await db("user")
        .where("id", userData.id)
        .update({
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
      const userData = await db("user").where({ id: decode.id }).first();
      console.log(userData);
      return userData;
    }
  }
}
