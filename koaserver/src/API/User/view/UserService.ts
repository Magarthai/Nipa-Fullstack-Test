import { Inject, Service } from "typedi";
import { UserRepository } from "../repository/UserRepository";
import { ICreateUserRequest } from "../dto/ICreateUserRequest";
import { ILoginUserRequest } from "../dto/ILoginUserRequest";
import bcrypt = require("bcrypt");
import { UserDataListReturn } from "../repository/UserDataListReturn";
import db from "@app/db/db";
import { Knex } from "knex";
import { generateRefreshToken } from "@app/utils/generateRefreshToken";
import { Payload } from "../dto/Payload";
import jwt from "jsonwebtoken";
import { secret } from "../dto/secret";
import { UserStatus } from "../enum/UserStatus";
@Service()
export class UserService {
  database: Knex.QueryBuilder;
  constructor(
    @Inject(() => UserRepository)
    private userRepository: UserRepository
  ) {
    this.database = db("user");
  }

  async useListAllUserData() {
    const userData = this.userRepository.listAllUserData();
    return userData;
  }

  async useCreateUser(data: ICreateUserRequest) {
    const findExitEmail = await this.userRepository.createUserData(data);
    if (findExitEmail) {
      return "User already exists";
    } else {
      const salt = bcrypt.genSaltSync(10);
      const password: any = data.password;
      const hash = bcrypt.hashSync(password, salt);
      const encryptedData = {
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: hash,
      };
      const selectUserData = await this.database
        .clone()
        .insert([encryptedData])
        .returning(UserDataListReturn);
      return selectUserData;
    }
  }

  async useLoginUser(data: ILoginUserRequest) {
    const findUser = await this.userRepository.loginUser(data);
    if (findUser) {
      const isPasswordMatched = await bcrypt.compare(
        data.password,
        findUser.password
      );
      console.log(findUser);
      if (isPasswordMatched) {
        const refreshToken = await generateRefreshToken(findUser?.id);
        const updateUser = await this.database
          .clone()
          .where({ id: findUser.id })
          .update({
            refreshToken: refreshToken,
            updated_at: db.fn.now(),
          });
        return {
          message: UserStatus.Password_matched,
          refreshToken: refreshToken,
        };
      } else {
        return { message: UserStatus.Invalid_password };
      }
    } else {
      return { message: "User not found" };
    }
  }

  async useLogoutUser(refreshToken: string) {
    const useLogoutUser = this.userRepository.logoutUser(refreshToken);
    return useLogoutUser;
  }

  async useRefreshTokenUser(refreshToken: string) {
    const decode: Payload = jwt.verify(refreshToken, secret) as Payload;
    const useRefreshToken = this.userRepository.refreshTokenUser(decode);
    return useRefreshToken;
  }
}
