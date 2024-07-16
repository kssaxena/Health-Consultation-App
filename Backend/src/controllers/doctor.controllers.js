import { DoctorUser } from "../models/doctor.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const doctorRegister = asyncHandler(async (req, res) => {
  // Code to register a doctor goes here
  const {
    email,
    first_name,
    last_name,
    contact_number,
    age,
    gender,
    experience,
    fee,
    location,
    specialization,
    name_of_workplace,
    password,
  } = req.body;

  if (
    [
      email,
      first_name,
      last_name,
      contact_number,
      age,
      gender,
      experience,
      fee,
      location,
      specialization,
      name_of_workplace,
      password,
    ].some((field) => (field?.trim() ?? "").length === 0)
  ) {
    throw new ApiError(400, "All fields are Required");
  }

  if(age<25) throw new ApiError(400, "Age must be between 25")

  const existingDoctorUser = await DoctorUser.findOne({ email });

  if (existingDoctorUser) {
    throw new ApiError(400, "User already exists");
  }

  const newDoctorUser = await DoctorUser.create({
    email,
    first_name,
    last_name,
    contact_number,
    age,
    gender,
    experience,
    fee,
    location,
    specialization,
    name_of_workplace,
    password,
  });

  const checkDoctorUser = await DoctorUser.findById(newDoctorUser._id).select(
    "-password "
  );
  if (!checkDoctorUser) {
    throw new ApiError(500, "Failed to create user");
  }

  res
    .status(200)
    .json(new ApiResponse(200, checkDoctorUser, "You are Registered."));
});

export { doctorRegister };
