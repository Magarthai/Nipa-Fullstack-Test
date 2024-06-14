import { Inject, Service } from "typedi";
import { UserRepository } from "../repository/UserRepository";
import { ICreateUserRequest } from "../dto/ICreateUserRequest";
import { ILoginUserRequest } from "../dto/ILoginUserRequest";
import bcrypt = require("bcrypt");
import db from "@app/db/db";
import { Knex } from "knex";
import { generateRefreshToken } from "@app/utils/generateRefreshToken";
import { Payload } from "../dto/Payload";
import jwt from "jsonwebtoken";
import { UserStatus } from "../enum/UserStatus";
import { IListAllUserDataRespone } from "../dto/IListAllUserDataRespone";
import { ICreateUserRespone } from "../dto/ICreateUserRespone";
import { IFindByID } from "../dto/IFindByID";
import { IEncryptedData } from "../dto/IEncryptedData";
import { TokenNotFoundError } from "@app/error/TokenNotFound";
import dotenv from "dotenv";
import { TokenExpired } from "@app/error/TokenExpired";
dotenv.config();

@Service()
export class UserService {
  database: Knex.QueryBuilder;
  constructor() {
    this.database = db("user");
  }

  @Inject(() => UserRepository)
  private userRepository: UserRepository;

  async useListAllUserData(): Promise<IListAllUserDataRespone[]> {
    const userData = this.userRepository.listAllUserData();
    return userData;
  }

  async useCreateUser(
    data: ICreateUserRequest
  ): Promise<"User already exists" | ICreateUserRespone> {
    const findExitEmail = await this.userRepository.findByEmail(data.email);
    if (findExitEmail) {
      return "User already exists";
    } else {
      const salt = bcrypt.genSaltSync(10);
      const password: any = data.password;
      const hash = bcrypt.hashSync(password, salt);
      const encryptedData: IEncryptedData = {
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: hash,
      };
      const createUser = await this.userRepository.createUserData(
        encryptedData
      );
      return createUser;
    }
  }

  async useLoginUser(
    data: ILoginUserRequest
  ): Promise<{ message: string; refreshToken?: string }> {
    const findUser = await this.userRepository.findByEmail(data.email);
    if (!findUser) {
      return { message: "User not found" };
    }
    const isPasswordMatched = await bcrypt.compare(
      data.password,
      findUser.password
    );
    if (!isPasswordMatched) {
      return { message: UserStatus.Invalid_password };
    }
    const refreshToken = generateRefreshToken(findUser?.id);
    return {
      message: UserStatus.Password_matched,
      refreshToken: refreshToken,
    };
  }

  async useLogoutUser(refreshToken: string): Promise<string> {
    const decode: Payload = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET || "secret"
    ) as Payload;

    const useLogoutUser = this.userRepository.findById(parseInt(decode.id));
    if (!useLogoutUser) {
      return UserStatus.Not_found;
    }
    return UserStatus.Success;
  }

  async useRefreshTokenUser(refreshToken: string): Promise<IFindByID | string> {
    if (!refreshToken) {
      throw new TokenNotFoundError();
    }
    try {
      const decode: Payload = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET || "secret"
      ) as Payload;
      const useRefreshToken = await this.userRepository.findById(
        parseInt(decode.id)
      );
      return useRefreshToken;
    } catch (err) {
      throw new TokenExpired();
    }
  }
}
