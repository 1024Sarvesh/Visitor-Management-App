import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },

  mobileNo: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  purpose: {
    type: String,
    required: true,
  },

  remarks: String,

  date_and_time: {
    type: Date,
    default: Date.now(),
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
})

export const Visitor = mongoose.model("Visitor", VisitorSchema)