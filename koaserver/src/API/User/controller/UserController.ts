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
} from "routing-controllers";
import { Service } from "typedi";
import { UserService } from "../view/UserService";
import { ICreateUserRequest } from "../repository/ICreateUserRequest";
import { ICreateUserRespone } from "./ICreateUserRespone";
import { ILoginUserRequest } from "../repository/ILoginUserRequest";
import { Context } from "koa";

@Service()
@JsonController()
export class UserController {
  static DashboardController: string | Function;
  constructor(private userService: UserService) {}
  @Get("/users")
  async listAllUser() {
    const data = await this.userService.useListAllUserData();
    if (data) {
      return data;
    } else {
      return "Not found";
    }
  }

  @Post("/users")
  async createUser(@Body() user: ICreateUserRequest) {
    try {
      const create = await this.userService.useCreateUser(user);
      return create;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post("/login")
  async login(@Ctx() ctx: Context, @Body() user: ILoginUserRequest) {
    const login = await this.userService.useLoginUser(user);
    console.log("controller", login);
    if (login.message === "password matched") {
      try {
        // Set refreshToken cookie
        ctx.cookies.set("refreshToken", login.refreshToken);
      } catch (err) {
        console.log(err);
      }
      return "User logged in successfully";
    } else if (login.message === "Invalid password") {
      return "Invalid password";
    } else {
      return "Not found";
    }
  }
  @Get("/refresh")
  async refreshToken(
    @CookieParam("refreshToken") refreshToken: string,
    @Ctx() ctx: Context
  ) {
    if (!refreshToken) {
      return {
        message: "Refresh Token Not Found",
      };
    } else {
      const refresh = await this.userService.useRefreshTokenUser(refreshToken);
      return { message: "success", user: refresh };
    }
  }

  @Get("/logout")
  async logout(
    @CookieParam("refreshToken") refreshToken: string,
    @Res() response: any,
    @Ctx() ctx: Context
  ) {
    const logout = await this.userService.useLogoutUser(refreshToken);
    if (logout == "not found token") {
      return "not found token";
    } else if (logout == "not found data") {
      ctx.cookies.set("refreshToken", "");
      return;
    } else if (logout == "success") {
      ctx.cookies.set("refreshToken", "");
      return "success";
    }
  }
}
