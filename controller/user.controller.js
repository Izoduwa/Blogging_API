const asyncHandler = require("express-async-handler");
const generateToken = require("../util/generateToken");
const User = require("../models/user");

//Sign In User
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({ message: "User logged in successfully" });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//Register User
const registerUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    first_name,
    last_name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//Logout User
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

//Fetch User Profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
  };
  res.status(200).json({ user });
});

//Update User Profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const upDatedUser = await user.save();
    res.status(200).json({ message: "User information updated successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
