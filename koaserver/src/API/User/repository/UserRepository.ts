import { Service } from "typedi";
import bcrypt = require("bcrypt");
import db from "../../../db/db";
import { Knex } from "knex";
import { IFindByEmail } from "../dto/IFindByEmail";
import { IFindByID } from "../dto/IFindByID";
import { IListAllUserDataRespone as IListAllUserDataRespone } from "../dto/IListAllUserDataRespone";
import { ICreateUserRespone } from "../dto/ICreateUserRespone";
import { IEncryptedData } from "../dto/IEncryptedData";
import { UserDataListReturn } from "../dto/UserDataListReturn";
import MockDatabase from "@app/db/MockDatabase";

interface IUserRepository {
  listAllUserData(): Promise<IListAllUserDataRespone[]>;
  createUserData(userData: IEncryptedData): Promise<ICreateUserRespone>;
  findByEmail(email: string): Promise<IFindByEmail>;
  findById(id: number): Promise<IFindByID>;
}

@Service()
export class UserRepository {
  database: Knex.QueryBuilder;
  constructor() {
    this.database = db("user");
  }
  async listAllUserData(): Promise<IListAllUserDataRespone[]> {
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

  async findById(id: number): Promise<IFindByID> {
    try {
      const findUser = await this.database.clone().where("id", id).first();
      return findUser;
    } catch (err) {
      throw err;
    }
  }
}

@Service()
export class MockUserRepository implements IUserRepository {
  public mockUserDatabase = MockDatabase.user;
  listAllUserData(): Promise<IListAllUserDataRespone[]> {
    return Promise.resolve(this.mockUserDatabase);
  }
  createUserData(userData: IEncryptedData): Promise<ICreateUserRespone> {
    const data = {
      ...userData,
      id: 3,
      created_at: new Date(),
      updated_at: new Date(),
      role: "admin",
      refreshToken: "string",
    };
    const createUser = [...this.mockUserDatabase, data];
    const findCreatedUser = createUser.find((user) => {
      return user.id == data.id;
    });

    return Promise.resolve(findCreatedUser);
  }
  async findByEmail(email: string): Promise<IFindByEmail> {
    const findUser = await MockDatabase.user.find((user) => {
      return user.email == email;
    });
    return Promise.resolve(findUser);
  }
  findById(id: number): Promise<IFindByID> {
    const findUser = this.mockUserDatabase.find((user) => {
      return (user.id = id);
    });
    return Promise.resolve(findUser);
  }
}
