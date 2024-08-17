import { DoctorUser } from "../models/doctor.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const calculateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs); // milliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const doctorRegister = asyncHandler(async (req, res) => {
  // Code to register a doctor goes here

  /*fetch data from frontend
		  check for validation
		  check if user already exist
		  check for file upload process, cloudinary
		  create new user obj
		  remove password and refresh tokens from response
		  check for user creation
		  res.send( user )
		  */

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

  if (!email.includes("@")) throw new ApiError(400, "Please enter valid email");

  if (!email) throw new ApiError(400, "Please enter valid email");

  if (!contact_number)
    throw new ApiError(400, "Please enter valid Contact Number");

  if (!contact_number.length > 10)
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
    "-password "
  );
  if (!checkDoctorUser) {
    throw new ApiError(500, "Failed to create user");
  }

  return res
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

  // console.log(req.body);

  if (!email) {
    throw new ApiError(400, "Please provide email ");
  }
  if (!password) {
    throw new ApiError(400, "Please provide Password ");
  }

  const user = await DoctorUser.findOne({ email });

  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid user Password");

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

const GetAllDoctor = asyncHandler(async (req, res) => {
  const { specialization, consultationMode } = req.params;
  if (!specialization) throw new ApiError(403, "No specialization found");
  const AllDoctor = await DoctorUser.find({ consultationMode });
  if (!AllDoctor) throw new ApiError(404, "Doctor Not found");
  res.status(200).json(new ApiResponse(200, AllDoctor, "All Doctor"));

  console.log(AllDoctor);
});

export {
  doctorRegister,
  userDoctorLogin,
  userDoctorLogout,
  refreshAccessToken,
  GetAllDoctor,
};
