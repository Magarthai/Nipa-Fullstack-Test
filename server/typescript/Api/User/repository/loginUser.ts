const User = require("../../../models/User.model");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
import express, { Express, Request, Response } from "express";
interface UserData {
    id: number;
    fname: string;
    lname: string;
    email: string;
    password: string;
    role: string;
    refreshToken: string;
}

const generateRefreshToken = (id:string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };

const loginUser = async(req: Request, res: Response) => {
    try{
        const data = req.body;
        const email = data.email;
        const password = req.body.password;
        const findUser = await User.findOne({email: email});
        if(findUser) {
            const isPasswordMatched = await findUser.isPasswordMatched(password);
            const refreshToken = await generateRefreshToken(findUser?._id);
            const updateUser = await User.findByIdAndUpdate(
                findUser?.id,{refreshToken: refreshToken},{ new:true }
            )

            if(isPasswordMatched) {
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 3000000,
                    sameSite:"none"
                });
                res.send("User logged in successfully")
            } else {
                throw new Error("Invalid password");
            }
            
        } else {
            throw new Error("User not found");
        }
        

    } catch(err) {
        console.log("create user",err)
    }
}

module.exports = loginUser

  