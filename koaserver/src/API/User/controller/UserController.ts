import { Response, Request } from "koa";

import {
  JsonController,
  Get,
  Post,
  Body,
  CookieParam,
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
import { TokenNotFoundError } from "@app/error/TokenNotFound";
import { UserStatus } from "../enum/UserStatus";
import { CreateUserError } from "@app/error/CreateUserError";
import { IListAllUserDataRespone } from "../dto/IListAllUserDataRespone";
import { IFindByID } from "../dto/IFindByID";

@Service()
@JsonController()
export class UserController {
  @Inject()
  private userService: UserService;

  @Get("/users")
  @OnUndefined(UserNotFoundError)
  async listAllUser(): Promise<IListAllUserDataRespone[]> {
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

  @Post("/login")
  async login(
    @Ctx() ctx: Context,
    @Body() user: ILoginUserRequest
  ): Promise<{ message: string; token?: string }> {
    const login = await this.userService.useLoginUser(user);
    console.log("controller", login);
    if (login.message === UserStatus.Password_matched) {
      try {
        ctx.cookies.set("refreshToken", login.refreshToken, {
          httpOnly: true,
          sameSite: "none",
        });
      } catch (err) {
        console.log(err);
      }
      return {
        message: "User logged in successfully",
        token: login.refreshToken,
      };
    } else if (login.message === UserStatus.Invalid_password) {
      return { message: "Invalid password" };
    } else {
      return { message: "User not found" };
    }
  }

  @Get("/refresh")
  async refreshToken(
    @CookieParam("refreshToken") refreshToken: string
  ): Promise<{ message: string; user: IFindByID }> {
    console.log(refreshToken);
    try {
      if (!refreshToken) {
        console.log(refreshToken);
        return { message: "Not Found User", user: undefined };
      } else {
        const refresh: IFindByID = (await this.userService.useRefreshTokenUser(
          refreshToken
        )) as IFindByID;
        return { message: "success", user: refresh };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get("/logout")
  async logout(
    @CookieParam("refreshToken") refreshToken: string,
    @Ctx() ctx: Context
  ): Promise<string | undefined> {
    if (!refreshToken) {
      throw new TokenNotFoundError();
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
