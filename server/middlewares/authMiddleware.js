const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    console.log(req.headers.role)
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
        token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
  
        if (!user) {
          return res.status(401).json({ message: 'Not authorized, user not found' });
        }
  
        req.user = user;
        next();
      } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    } else {
      console.log("no token")
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  });
  

// if admin
const isAdmin = asyncHandler(async (req, res, next) => {
  console.log(req.headers.role)
    if (req.headers && req.headers.role === "admin") {
      next();
    } else {
      console.log('You are not authorized')
      res.status(401).json({ message: "You are not authorized" });
    }
  });
  
module.exports = { authMiddleware, isAdmin };
