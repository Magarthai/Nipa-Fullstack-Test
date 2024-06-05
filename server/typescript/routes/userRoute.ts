import { response } from "express";
import { Controller, Param, Body, Get, Post, Put, Delete, JsonController, Res, Req, CookieParam } from "routing-controllers";
const allUserData = require("../Api/User/alluser");
const User = require("../../models/User.model");
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || "secret";

export class Users {
    fname: string | undefined;
    lname: string | undefined;
    email: string | undefined;
    password: string | undefined;
    role: string | undefined;
    _id: string | undefined;
    __v: number | undefined
}

interface Payload {
    id: string | undefined;


}

export interface IUers {
    fname: string | undefined;
    lname: string | undefined;
    email: string | undefined;
    password: string | undefined;
    role: string | undefined;
    _id: string | undefined;
    __v: number | undefined
}

const generateRefreshToken = (id:string) => {
    return jwt.sign({ id }, secret, {
      expiresIn: "1d",
    });
  };

@JsonController()
export class UserController {

    @Get("/users")
    async getAllUser() {
        try {
            const data = await User.find();
            console.log(data)
            return data
        } catch (err) {
            return (err)
        }
    }

    @Get("/users/:id")
    async getOne(@Param("id") id:string) {
        try {
            console.log(id)
            const data:IUers = await User.findOne({_id:id});
            console.log(data)
            return response.send(data)
        } catch (err) {
            return (err)
        }
    }

    @Post("/users")
    async store( @Body() user:IUers , @Res() response:any) {
        try {
            
            const body = {
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                password: user.password,
                role: user.role
            }
            console.log(body)
            const findUser = await User.findOne({email: body.email});
            if (!findUser) {
                const createUser = await User.create(body);
                console.log(createUser)
                return response.send(createUser)
            } else {
                return response.send("User already exists");
            }
        } catch(err) {
            console.log(err)
            return err
        }
    };

    @Post("/login")
    async login(@Body() user:IUers , @Res() response:any) {
        try {
            const body = {
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                password: user.password,
                role: user.role
            }
            const findUser = await User.findOne({email: body.email});
            
            if(findUser) {
                const isPasswordMatched = await findUser.isPasswordMatched(body.password);
                const refreshToken = await generateRefreshToken(findUser?._id);
                const updateUser = await User.findByIdAndUpdate(
                    findUser?.id,{refreshToken: refreshToken},{ new:true }
                )

                if(isPasswordMatched) {
                    response.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 3000000,
                        sameSite:"none"
                    });
                    return response.send("User logged in successfully")
                } else {
                    return response.send("Invalid password");
                }
            } else {
                return response.send("not found")
            }

        } catch(err) {
            console.log(err)
            response.send(err)
        }
    }

    @Get("/refresh")
    async refresh(@CookieParam("refreshToken") refreshToken: string,@Body() user:IUers ,@Req() request:any, @Res() response:any) {
        try {

            console.log(refreshToken)
            if(!refreshToken) {
                return {
                    message: "Refresh Token Not Found"
                }
            }

            const decode:Payload = jwt.verify(refreshToken, secret) as Payload

            if(decode.id) {
                const userData = await User.findOne({_id:decode.id});
                if(userData) {
                    return response.send({message:"success", user:userData});
                }
            }

            
        } catch(err) {
            console.log(err)
            response.send(err)
        }
    }

    @Get("/logout")
    async logout(@CookieParam("refreshToken") refreshToken: string,@Body() user:IUers ,@Req() request:any, @Res() response:any) {
        try {
            if(!refreshToken) {
                return "not found token"
            }

            const user = await User.findOne({ refreshToken });
            if(!user) {
                response.clearCookie("refreshToken",  {
                    httpOnly: true,
                    secure: true
                });

                return response.sendStatus(204);
            }

            await User.findByIdAndUpdate(user._id, { refreshToken:"" });

            response.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
            });

            return response.send("success")
        } catch(err) {
            return err
        }
    }
}