import { Response, Request } from "koa";

import {
  JsonController,
  Get,
  Post,
  Param,
  Delete,
  Body,
  CookieParam,
  Res,
  Req,
  Ctx,
  OnUndefined,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { UserService } from "../view/UserService";
import { ICreateUserRequest } from "../dto/ICreateUserRequest";
import { ICreateUserRespone } from "../dto/ICreateUserRespone";
import { ILoginUserRequest } from "../dto/ILoginUserRequest";
import { Context } from "koa";
import { UserNotFoundError } from "@app/error/UserNotFound";
import db from "@app/db/db";
import { TokenNotFoundError } from "@app/error/TokenNotFound";
import { UserStatus } from "../enum/UserStatus";
import { CreateUserError } from "@app/error/CreateUserError";
import { IListAllUserDataRespone } from "../repository/IListAllUserDataRespone";
import { IFindByID } from "../repository/IFindByID";
@Service()
@JsonController()
export class UserController {
  @Inject()
  private userService: UserService;

  @Get("/users")
  @OnUndefined(UserNotFoundError)
  async listAllUser(): Promise<IListAllUserDataRespone> {
    const data = await this.userService.useListAllUserData();
    return data;
  }

  @Post("/users")
  async createUser(
    @Body() user: ICreateUserRequest
  ): Promise<"User already exists" | ICreateUserRespone> {
    try {
      const create = await this.userService.useCreateUser(user);
      return create;
    } catch (err) {
      throw new CreateUserError();
    }
  }

  // @Get("/users/:id")
  // @OnUndefined(UserNotFoundError)
  // async getUser(@Param("id") id: string) {
  //   const data = await db("user").where("id", id).first();
  //   if (!data) {
  //     throw new UserNotFoundError(404, "Not found user!", "Not found");
  //   }
  //   return data;
  // }

  @Post("/login")
  async login(
    @Ctx() ctx: Context,
    @Body() user: ILoginUserRequest
  ): Promise<string> {
    const login = await this.userService.useLoginUser(user);
    console.log("controller", login);
    if (login.message === UserStatus.Password_matched) {
      try {
        ctx.cookies.set("refreshToken", login.refreshToken);
      } catch (err) {
        console.log(err);
      }
      return "User logged in successfully";
    } else if (login.message === UserStatus.Invalid_password) {
      return "Invalid password";
    } else {
      throw new UserNotFoundError(404, "Not found user!", "Not found");
    }
  }
  @Get("/refresh")
  async refreshToken(
    @CookieParam("refreshToken") refreshToken: string
  ): Promise<{ message: string; user: IFindByID }> {
    if (!refreshToken) {
      throw new TokenNotFoundError(404, "Refresh Token Not Found", "Not found");
    } else {
      const refresh = await this.userService.useRefreshTokenUser(refreshToken);
      return { message: "success", user: refresh };
    }
  }

  @Get("/logout")
  async logout(
    @CookieParam("refreshToken") refreshToken: string,
    @Ctx() ctx: Context
  ): Promise<string | undefined> {
    if (!refreshToken) {
      throw new TokenNotFoundError(404, "Not found token!", "Not found");
    }
    const logout = await this.userService.useLogoutUser(refreshToken);
    if (logout == UserStatus.Not_found) {
      ctx.cookies.set("refreshToken", "");
      return "success";
    } else if (logout == UserStatus.Success) {
      ctx.cookies.set("refreshToken", "");
      return "success";
    }
  }
}
