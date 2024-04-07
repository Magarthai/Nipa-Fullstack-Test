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
  console.log(cookie);
  if (!cookie.refreshToken) {
    res.json({message:"Refresh Token Not Found"})
    return;
  }
  const refreshToken = cookie.refreshToken;

  console.log(refreshToken);
  
  jwt.verify(refreshToken, process.env.JWT_SECRET, async(err, decode) => {
    if (err || !decode.id) {
      res.json({message:"Invalid refresh token"})
      return;

    }
    const id = decode.id 
    console.log(id)
      const user = await User.findOne({ _id: id });
    if (!user) {
      res.json({message:"User not found"}) ;
      return;

    }
    res.json({user:user, message:"success"}) ;
  });
});

// logout user

const logoutUserCtrl = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // No Content
  }

  await User.findByIdAndUpdate(user._id, { refreshToken: "" });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // No Content
});

// get all user
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUser = await User.find();
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

// get a single users

const getSingleUser = asyncHandler(async (req, res) => {
  const phone = req.params.phone;
  try {
    const getUser = await User.findOne({ phone: phone });
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

// delete single user

const deleteUser = asyncHandler(async (req, res) => {
  const phone = req.params.phone;
  try {
    const deleteUser = await User.findOneAndDelete({ phone: phone });
    res.json(deleteUser);
    console.log("User deleted successfully");
  } catch (error) {
    throw new Error(error);
  }
});

// update user details except password

const updateUser = asyncHandler(async (req, res) => {
  const phone = req.params.phone;
  try {
    const updateUser = await User.findOneAndUpdate(
      { phone: phone },
      {
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address,
        age: req.body.age,
        email: req.body.email,
        gender: req.body.gender,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  logoutUserCtrl,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
  handleRefreshToken,
};
