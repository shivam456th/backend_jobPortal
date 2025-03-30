import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    emailToken: { type: String, default: null },
    OTP: { type: String, default: null },
    bio: { type: String },
    address: { type: String },
    resume: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    profileImage: { type: String, default: null },
    role: { type: String, enum: ["employee", "employer"], required: true },
    // Employer-specific fields
      companyName: { type: String },
      companyPhone: { type: String },
      companyAddress: { type: String },
      industry: { type: String },
      companySize: { 
        type: String,
      },
      companyDescription: { type: String }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;