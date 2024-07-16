import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    contact_number: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
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
    name_of_workplace: {
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

export const DoctorUser = mongoose.model("DoctorUser", doctorSchema);
