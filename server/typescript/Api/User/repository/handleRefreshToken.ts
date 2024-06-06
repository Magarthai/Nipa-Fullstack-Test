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



const refresh = async(req: Request, res: Response) => {
    try{
        const cookie = req.cookies;
        if (!cookie.refreshToken) {
            res.json({message:"Refresh Token Not Found"})
            return;
        };
        const refreshToken = cookie.refreshToken;

        jwt.verify(refreshToken, process.env.JWT_SECRET, async(err:string, decode:{id:string}) => {
            if (err || !decode.id) {
              res.json({message:"Invalid refresh token"})
              return;
        
            }
            const id = decode.id 
              const user = await User.findOne({ _id: id });
            if (!user) {
              res.json({message:"User not found"}) ;
              return;
        
            }
            res.json({user:user, message:"success"}) ;
          });
        

    } catch(err) {
        console.log("handleRefreshToken",err)
    }
}

module.exports = refresh
  