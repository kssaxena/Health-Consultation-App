import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

//construction of schema of the doctor
const doctorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contact_number: {
      type: Number,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    clinic_name: {
      type: String,
      required: true,
    },
    consultationMode: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


//hashing password before saving it to the database
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//method to compare password entered by user with the hashed password in the database
doctorSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//method to generate access token for the doctor
doctorSchema.methods.generateAccessToken = function () {
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


//method to generate refresh token for the doctor
doctorSchema.methods.generateRefreshToken = function () {
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

export const DoctorUser = mongoose.model("DoctorUser", doctorSchema);
