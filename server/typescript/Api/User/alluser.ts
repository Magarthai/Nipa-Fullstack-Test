const User = require("../../../models/User.model");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
import express, { Express, Request, response, Response } from "express";
export interface UserData {
    id: number;
    fname: string;
    lname: string;
    email: string;
    password: string;
    role: string;
    refreshToken: string;
}



const allUserData = async(req: Request, res: Response) => {
    try{
        const data = await User.find();
        res.send(data)
    } catch(err) {
        console.log("handleRefreshToken",err)
    }
}

module.exports = allUserData;
  