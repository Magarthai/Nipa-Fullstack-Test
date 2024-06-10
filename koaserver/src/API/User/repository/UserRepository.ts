import { Service } from "typedi";
import bcrypt = require("bcrypt");
import db from "../../../db/db";
import { Knex } from "knex";
import { ICreateUserRequest } from "../dto/ICreateUserRequest";
import { ILoginUserRequest } from "../dto/ILoginUserRequest";
import { UserStatus } from "../enum/UserStatus";
import { IFindByEmail } from "./IFindByEmail";
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

  async findByEmail(email: string) {
    try {
      const findUser = await this.database
        .clone()
        .where("email", email)
        .first();
      if (!findUser) {
        return UserStatus.Not_found;
      }
      return findUser;
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const findUser = await this.database.clone().where("id", id).first();
      if (!findUser) {
        return UserStatus.Not_found;
      }
      return findUser;
    } catch (err) {
      throw err;
    }
  }
}
