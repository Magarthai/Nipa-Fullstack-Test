const User = require("../../../models/User.model");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
import express, { Express, Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const email = data.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } else {
      throw new Error("User already exists");
    }
  } catch (err) {
    console.log("create user", err);
  }
};

module.exports = createUser;
