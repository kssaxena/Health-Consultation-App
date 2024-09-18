import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

//construction of schema of the user
const userPatientSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    // age: {
    //   type: Number,
    //   required: true, // Consider removing this if you calculate age dynamically
    // },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      trim: true,
      type: String,
      required: true,
    },
    medical_record: {
      type: String,
    },
    appointment: {
      type: Date,
    },
    medical_history: {
      type: String,
    },
    payments: {
      type: Number,
    },
  },
  { timestamps: true }
);

//hashing password before saving it to the database
userPatientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//method to compare password entered by user with the hashed password in the database
userPatientSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};


//method to generate access token for user
userPatientSchema.methods.generateAccessToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//method to generate refresh token for user
userPatientSchema.methods.generateRefreshToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userPatientSchema);
