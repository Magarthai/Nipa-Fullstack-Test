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
const User = require("../../../../models/User.model");
import { IUser } from "../repository/IUser";
import { ICreateUserRequest } from "./ICreateUserRequest";
import { UserService } from "../view/UserService";
import { ICreateUserRespone } from "./ICreateUserRespone";
import { ILoginUserRequest } from "./ILoginUserRequest";

@JsonController()
export class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  @Get("/users")
  async getAllUser(@Res() response: any) {
    try {
      const data = await this.userService.useGetAllUserData();
      return response.send(data);
    } catch (err) {
      return err;
    }
  }

  @Get("/users/:id")
  async getOne(@Param("id") id: string) {
    try {
      console.log(id);
      const data: IUser = await User.findOne({ _id: id });
      console.log(data);
      return response.send(data);
    } catch (err) {
      return err;
    }
  }

  @Post("/users")
  async store(
    @Body() user: ICreateUserRequest,
    @Res() response: any
  ): Promise<ICreateUserRespone> {
    try {
      const create = await this.userService.useCreateUser(user);
      return response.send(create);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post("/login")
  async login(@Body() user: ILoginUserRequest, @Res() response: any) {
    try {
      const login = await this.userService.useLoginUser(user);

      if (login.message == "password matched") {
        response.cookie("refreshToken", login.refreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: 3000000,
          sameSite: "none",
        });
        return response.send("User logged in successfully");
      } else if (login.message == "Invalid password") {
        return response.send("Invalid password");
      } else {
        return response.send("not found");
      }
    } catch (err) {
      console.log(err);
      response.send(err);
    }
  }

  @Get("/refresh")
  async refresh(
    @CookieParam("refreshToken") refreshToken: string,
    @Res() response: any
  ) {
    try {
      if (!refreshToken) {
        return {
          message: "Refresh Token Not Found",
        };
      } else {
        const refresh = await this.userService.useRefreshTokenUser(
          refreshToken
        );
        return response.send({ message: "success", user: refresh });
      }
    } catch (err) {
      console.log(err);
      response.send(err);
    }
  }

  @Get("/logout")
  async logout(
    @CookieParam("refreshToken") refreshToken: string,
    @Res() response: any
  ) {
    try {
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
        return response.send("success");
      }
    } catch (err) {
      return err;
    }
  }
}
