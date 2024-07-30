import ApiError from "../utils/ApiError.js";
import { User } from "../models/patient.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const userRegister = asyncHandler(async (req, res) => {
  /*fetch data from frontend
		  check for validation
		  check if user already exist
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

export { userRegister, userLogin, userLogout, refreshAccessToken };
