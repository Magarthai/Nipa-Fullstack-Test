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

const logout = async(req: Request, res: Response) => {
    try{
        const cookie = req.cookies;
        console.log(cookie);
        if (!cookie.refreshToken) {
            res.json("not found token")
            return;
        }
        const refreshToken = cookie.refreshToken;
        const user = await User.findOne({ refreshToken });
        if (!user) {
            res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            });
            return res.sendStatus(204);
        }

        await User.findByIdAndUpdate(user._id, { refreshToken: "" });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        res.send("success")

    } catch(err) {
        console.log("logout",err)
    }
}

module.exports = logout

  