import { response } from "express";
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Res,
  Req,
  CookieParam,
} from "routing-controllers";
import { ICreateUserRequest } from "./ICreateUserRequest";
import { UserService } from "../view/UserService";
import { ICreateUserRespone } from "./ICreateUserRespone";
import { ILoginUserRequest } from "./ILoginUserRequest";
import { Service, Inject, Container } from "typedi";
@Service()
@JsonController()
export class UserController {
  userService = Container.get(UserService);

  @Get("/users")
  async listAllUser() {
    const data = await this.userService.useListAllUserData();
    if (data) {
      return data;
    } else {
      return "Not found";
    }
  }

  // @Get("/users/:id")
  // async getOne(@Param("id") id: string) {
  //   try {
  //     console.log(id);
  //     const data: IUser = await User.findOne({ _id: id });
  //     console.log(data);
  //     return response.send(data);
  //   } catch (err) {
  //     return err;
  //   }
  // }

  @Post("/users")
  async createUser(
    @Body() user: ICreateUserRequest,
    @Res() response: any
  ): Promise<ICreateUserRespone> {
    try {
      const create = await this.userService.useCreateUser(user);
      return create;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post("/login")
  async login(@Body() user: ILoginUserRequest, @Res() response: any) {
    const login = await this.userService.useLoginUser(user);
    console.log("controller", login);
    if (login.message == "password matched") {
      response.cookie("refreshToken", login.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 3000000,
        sameSite: "none",
      });
      return response.send("User logged in successfully");
    } else if (login.message == "Invalid password") {
      return "Invalid password";
    } else {
      return "Not found";
    }
  }

  @Get("/refresh")
  async refreshToken(
    @CookieParam("refreshToken") refreshToken: string,
    @Res() response: any
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
    @Res() response: any
  ) {
    const logout = await this.userService.useLogoutUser(refreshToken);
    if (logout == "not found token") {
      return "not found token";
    } else if (logout == "not found data") {
      response.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return response.sendStatus(204);
    } else if (logout == "success") {
      response.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return "success";
    }
  }
}
