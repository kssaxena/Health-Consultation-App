import { DoctorUser } from "../models/doctor.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Utility function to generate access and refresh tokens
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await DoctorUser.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

// Utility function to calculate age from date of birth
const calculateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs); // milliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// Handler for doctor registration
const doctorRegister = asyncHandler(async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    contact_number,
    dob,
    gender,
    experience,
    fee,
    location,
    specialization,
    clinic_name,
    consultationMode,
    password,
  } = req.body;

  if (
    [
      email,
      firstName,
      lastName,
      contact_number,
      dob,
      gender,
      experience,
      fee,
      location,
      specialization,
      clinic_name,
      consultationMode,
      password,
    ].some((field) => (field?.trim() ?? "").length === 0)
  ) {
    throw new ApiError(400, "All fields are Required");
  }

  // Validate date_of_birth format
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) {
    throw new ApiError(400, "Invalid date of birth");
  }

  // Calculate age from date of birth
  const age = calculateAge(dob);
  if (age < 25) throw new ApiError(400, "Age must be between 25");

  if (!email.includes("@"))
    throw new ApiError(400, "Please enter a valid email");

  if (!contact_number || contact_number.length <= 10)
    throw new ApiError(400, "Please enter a valid Contact Number");

  if (!password) throw new ApiError(400, "Please enter Password");

  const existingDoctorUser = await DoctorUser.findOne({ email });

  if (existingDoctorUser) {
    throw new ApiError(400, "User already exists");
  }

  const newDoctorUser = await DoctorUser.create({
    email,
    firstName,
    lastName,
    contact_number,
    dob,
    gender,
    experience,
    fee,
    location,
    specialization,
    clinic_name,
    consultationMode,
    password,
  });

  const checkDoctorUser = await DoctorUser.findById(newDoctorUser._id).select(
    "-password"
  );
  if (!checkDoctorUser) {
    throw new ApiError(500, "Failed to create user");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    checkDoctorUser._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("RefreshToken", refreshToken, options)
    .cookie("AccessToken", accessToken, options)
    .json(new ApiResponse(200, checkDoctorUser, "You are Registered."));
});

// Handler for doctor login
const userDoctorLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw new ApiError(400, "Please provide email");
  if (!password) throw new ApiError(400, "Please provide Password");

  const user = await DoctorUser.findOne({ email });

  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid user Password");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await DoctorUser.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

// Handler for doctor logout
const userDoctorLogout = asyncHandler(async (req, res) => {
  await DoctorUser.findByIdAndUpdate(req.user._id, {
    new: true,
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

// Handler for refreshing access token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await DoctorUser.findById(decodedToken._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid refresh token");
  }
});

// Handler for getting all doctors based on specialization and consultation mode
const GetAllDoctor = asyncHandler(async (req, res) => {
  const { specialization, consultationMode } = req.params;
  if (!specialization) throw new ApiError(403, "No specialization found");

  const AllDoctor = await DoctorUser.find({ consultationMode });
  if (!AllDoctor) throw new ApiError(404, "Doctor Not found");

  res.status(200).json(new ApiResponse(200, AllDoctor, "All Doctor"));
  console.log(AllDoctor);
});

// Handler for getting detailed doctor information
const getDoctorDetails = asyncHandler(async (req, res) => {
  const { specialization, consultationMode } = req.params;
  // console.log( req)
  // const { consultationMode } = req.params;

  const doctors = await DoctorUser.find({ specialization  }); // Fetch all doctors
  // const doctorDetails = doctors.map((doctor) => collectDoctorData(doctor));
  console.log(doctors);
  res.status(200).json(new ApiResponse(200, doctors, "Doctor Details"));
});

// Utility function to collect doctor data
function collectDoctorData(doctor) {
  const {
    _id,
    email,
    firstName,
    lastName,
    contact_number,
    dob,
    gender,
    experience,
    fee,
    location,
    specialization,
    clinic_name,
    consultationMode,
    createdAt,
    updatedAt,
  } = doctor;

  const accessToken = doctor.generateAccessToken();
  const refreshToken = doctor.generateRefreshToken();

  return {
    _id,
    email,
    firstName,
    lastName,
    contact_number,
    dob,
    gender,
    experience,
    fee,
    location,
    specialization,
    clinic_name,
    consultationMode,
    accessToken,
    refreshToken,
    createdAt,
    updatedAt,
  };
}

export {
  doctorRegister,
  userDoctorLogin,
  userDoctorLogout,
  refreshAccessToken,
  GetAllDoctor,
  collectDoctorData,
  getDoctorDetails,
};
