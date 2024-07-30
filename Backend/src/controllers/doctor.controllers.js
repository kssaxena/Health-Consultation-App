import { DoctorUser } from "../models/doctor.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const doctorRegister = asyncHandler(async (req, res) => {
  // Code to register a doctor goes here
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
      password,
    ].some((field) => (field?.trim() ?? "").length === 0)
  ) {
    throw new ApiError(400, "All fields are Required");
  }

  if (dob < 25) throw new ApiError(400, "Age must be between 25");

  if (!email.includes("@")) throw new ApiError(400, "Please enter valid email");

  if (!email) throw new ApiError(400, "Please enter valid email");

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

const userDoctorLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email || !password)) {
    throw new ApiError(400, "Please provide email and password");
  }

  const user = await DoctorUser.findOne({ email });

  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user?._id
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

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await DoctorUser.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

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
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export {
  doctorRegister,
  userDoctorLogin,
  userDoctorLogout,
  refreshAccessToken,
};
