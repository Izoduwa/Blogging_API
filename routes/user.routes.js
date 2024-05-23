const express = require("express");
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controller/user.controller");
const protect = require("../auth/auth");

const userRouter = express.Router();

userRouter.post("/", authUser);
userRouter.post("/auth", registerUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/profile", protect, getUserProfile);
userRouter.put("/profile", protect, updateUserProfile);

module.exports = userRouter;
