import ApiError from "../utils/ApiError.js";
import { User } from "../models/patient.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// const upload = multer({ dest: "uploads/" });

const calculateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs); // milliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const userRegister = asyncHandler(async (req, res) => {
  // Extract fields from request body
  const { email, first_name, last_name, date_of_birth, gender, password } =
    req.body;

  // Check if all required fields are provided
  if (
    [email, first_name, last_name, date_of_birth, gender, password].some(
      (field) => (field?.trim() ?? "").length === 0
    )
  ) {
    throw new ApiError(400, "All fields are Required");
  }

  // Validate date_of_birth format
  const birthDate = new Date(date_of_birth);
  if (isNaN(birthDate.getTime())) {
    throw new ApiError(400, "Invalid date of birth");
  }

  // Calculate age from date of birth
  const age = calculateAge(date_of_birth);

  // Validate age
  if (age < 10) {
    throw new ApiError(400, "Age must be 10 or older");
  }

  // Validate email format
  if (!email.includes("@")) {
    throw new ApiError(400, "Please enter a valid email");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  // Create new user
  const newUser = await User.create({
    email,
    first_name,
    last_name,
    date_of_birth,
    age,
    gender,
    password,
  });

  // Fetch the newly created user without the password field
  const checkUser = await User.findById(newUser._id).select("-password");
  if (!checkUser) {
    throw new ApiError(500, "Failed to create user");
  }

  // Respond with success
  return res
    .status(200)
    .json(new ApiResponse(200, checkUser, "You are Registered."));
});

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

//user login function
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email || !password)) {
    throw new ApiError(400, "Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid user password");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user?._id
  );

  const loggedInUser = await User.findById(user._id).select(
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

//user logout function
const userLogout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
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

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh token");
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
    throw new ApiError(401, error?.message || "Invalid Refresh token");
  }
});

export { userRegister, userLogin, userLogout, refreshAccessToken };
