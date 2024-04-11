const User = require("../models/User.model");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { Error } = require("mongoose");
const jwt = require("jsonwebtoken");
const { generateRefreshToken } = require("../config/refreshToken");

const createUser = async (req, res) => {
  try {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exists");
  }
} catch (err) {
  console.log(err);
  res.send(err)
}
};

const loginUserCtrl = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const findUser = await User.findOne({ email: email });
  if (findUser) {
    const isPasswordMatched = await findUser.isPasswordMatched(password);
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser?._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    
    if (isPasswordMatched) {
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 3000000,
        sameSite:"none"
      });
      res.send("User logged in successfully");
    } else {
      throw new Error("Invalid password");
    }
  } else {
    throw new Error("User not found");
  }
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) {
    res.json({message:"Refresh Token Not Found"})
    return;
  }
  const refreshToken = cookie.refreshToken;

  
  jwt.verify(refreshToken, process.env.JWT_SECRET, async(err, decode) => {
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
});


const logoutUserCtrl = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token not found" });
  }

  try {
    const user = await User.findOne({ refreshToken });

    if (!user) {

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); // No Content
    }

    user.refreshToken = "";
    await user.save();


    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });

    // Send success response
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {

    console.error("Error logging out:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUser = await User.find();
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});





module.exports = {
  createUser,
  loginUserCtrl,
  logoutUserCtrl,
  getAllUser,
  handleRefreshToken,
};
