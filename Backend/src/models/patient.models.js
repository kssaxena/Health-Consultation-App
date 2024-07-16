import mongoose from "mongoose";

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
    age: {
      type: Number,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      trim: true,
      type: Number,
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

export const User = mongoose.model("User", userPatientSchema);
