import { Service } from "typedi";
import bcrypt = require("bcrypt");
import db from "../../../db/db";
import { Knex } from "knex";
import { ICreateUserRequest } from "../dto/ICreateUserRequest";
import { ILoginUserRequest } from "../dto/ILoginUserRequest";
import { UserStatus } from "../enum/UserStatus";
import { IFindByEmail } from "./IFindByEmail";
import { IFindByID } from "./IFindByID";
import { IListAllUserDataRespone } from "./IListAllUserDataRespone";
import { ICreateUserRespone } from "../dto/ICreateUserRespone";
import { IEncryptedData } from "../view/IEncryptedData";
import { UserDataListReturn } from "./UserDataListReturn";
@Service()
export class UserRepository {
  database: Knex.QueryBuilder;
  constructor() {
    this.database = db("user");
  }
  async listAllUserData(): Promise<IListAllUserDataRespone> {
    const data = await this.database.clone();
    return data;
  }
  async createUserData(userData: IEncryptedData): Promise<ICreateUserRespone> {
    try {
      const createUser: ICreateUserRespone = await this.database
        .clone()
        .insert([userData])
        .returning(UserDataListReturn);
      return createUser;
    } catch (err) {
      throw err;
    }
  }

  async findByEmail(email: string): Promise<IFindByEmail> {
    try {
      const findUser = await this.database
        .clone()
        .clone()
        .where("email", email)
        .first();
      return findUser;
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string): Promise<IFindByID> {
    try {
      const findUser = await this.database.clone().where("id", id).first();
      return findUser;
    } catch (err) {
      throw err;
    }
  }
}
