import { Service } from "typedi";
import bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
import db from "../../../db/db";
import { Knex } from "knex";
import { ICreateUserRequest } from "../dto/ICreateUserRequest";
import { UserDataListReturn } from "./UserDataListReturn";
import { Payload } from "../dto/Payload";
import { ILoginUserRequest } from "../dto/ILoginUserRequest";
import { secret } from "../dto/secret";
import { UserStatus } from "../enum/UserStatus";
const generateRefreshToken = (id: number) => {
  return jwt.sign({ id }, secret, {
    expiresIn: "1d",
  });
};

@Service()
export class UserRepository {
  database: Knex.QueryBuilder;
  constructor() {
    this.database = db("user");
  }
  async listAllUserData() {
    const data = await this.database.clone();
    return data;
  }
  async createUserData(userData: ICreateUserRequest) {
    try {
      const findExitEmail = await this.database
        .clone()
        .where("email", userData.email)
        .first();
      return findExitEmail;
    } catch (err) {
      throw err;
    }
  }

  async loginUser(userData: ILoginUserRequest) {
    try {
      const findUser = await this.database
        .clone()
        .where("email", userData.email)
        .first();

      return findUser;
    } catch (err) {
      throw err;
    }
  }
  async logoutUser(refreshToken: string) {
    try {
      const userData = await this.database
        .clone()
        .where("refreshToken", refreshToken)
        .first();
      if (!userData) {
        return UserStatus.Not_found;
      }

      const updateRefreshToken = await this.database
        .clone()
        .where("id", userData.id)
        .update({
          refreshToken: "",
        });
      return UserStatus.Success;
    } catch (err) {
      throw err;
    }
  }

  async refreshTokenUser(decode: any) {
    if (decode.id) {
      const userData = await this.database
        .clone()
        .where({ id: decode.id })
        .first();
      console.log(userData);
      return userData;
    }
  }
}
