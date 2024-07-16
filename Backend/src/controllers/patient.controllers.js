import ApiError from "../utils/ApiError.js";
import { User } from "../models/patient.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";

const userRegister = asyncHandler(async (req, res) => {
  /*fetch data from frontend
		  check for validation
		  check if user already exist
		  check for file, avatar
		  check for file upload process, cloudinary
		  create new user obj
		  remove password and refresh tokens from response
		  check for user creation
		  res.send( user )
		  */
  const { email, first_name, last_name, age, gender, password } = req.body;
  console.log(req);
  if (
    [email, first_name, last_name, age, gender, password].some(
      (field) => (field?.trim() ?? "").length === 0
    )
  ) {
    throw new ApiError(400, "All fields are Required");
  }

  if (!age) throw new ApiError(400, "Please enter age");

  if (age < 10) throw new ApiError(400, "Age must be between 10");

  if (!email.includes("@")) throw new ApiError(400, "Please enter valid email");

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const newUser = await User.create({
    email,
    first_name,
    last_name,
    age,
    gender,
    password,
  });

  const checkUser = await User.findById(newUser._id).select("-password");
  if (!checkUser) {
    throw new ApiError(500, "Failed to create user");
  }

  res.status(200).json(new ApiResponse(200, checkUser, "You are Registered."));
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(404, "User not found");
});

export { userRegister, userLogin };
