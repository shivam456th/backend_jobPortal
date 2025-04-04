
import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { emailTemplate, otpTemplate } from "../Templates/mailtemplate.js";
import sendEmail from "../Utils/mailer.js";
import customError from "../Utils/customError.js";
import { upload } from "../Middlewares/multer.js";

//user controllers

//signup controller
export const userSignupController = async (req, res, next) => {
  const { fname, lname, email, password, phone, role } = req.body;
  if (!fname || !email || !lname || !password || !phone || !role) {
    console.log(role);
    throw new customError(401, "fields cannot be empty");
  }

  const hasedPassword = await bcrypt.hash(password, 10);
  const mailToken = crypto.randomBytes(12).toString("hex");
  await User.create({
    fname,
    lname,
    email,
    password: hasedPassword,
    phone,
    role,
    emailToken: mailToken,
  });

  const user = await User.findOne({ email });
  const id = user._id.toString();

  const personalizedTemplate = emailTemplate
    .replace("{name}", fname)
    .replace(
      "{link}",
      `http://localhost:5000/api/verification/${id}/${mailToken}`
    );

  sendEmail(email, "Email Verification", personalizedTemplate);

  res
    .status(201)
    .json({ message: "User created successfully, kindly verify your email." });
};

export const userMailController = async (req, res) => {
  const { id, emailtoken } = req.params; //token from params
  const user = await User.findOne({ _id: id });

  console.log(user);
  if (!user) {
    res.status(404).json({ message: "user not found" });
    throw new customError(404, "user not found");
  }
  const verificationtoken = user.emailToken; //token from db
  if (verificationtoken === emailtoken) {
    user.isVerified = true;
    user.emailToken = undefined;
    await user.save();
    res.redirect("http://localhost:5173/mail-verified-successfully");
  } else {
    res.redirect("http://localhost:5173/mail-verified-failed");
  }
};

export const passwordRest = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const newOTP = Math.floor(1000 + Math.random() * 9000);
  user.OTP = newOTP;
  await user.save();

  sendEmail(email, "Password Reset OTP", otpTemplate.replace("{otp}", newOTP));

  return res.json({
    message: "OTP sent to your registered email",
  });
};

export const verifyOTP = async (req, res) => {
  const { email } = req.params;
  const { OTP } = req.body;
  const user = await User.findOne({ email });
  console.log(email, OTP);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the OTP entered by the user matches the one stored in the database
  if (user.OTP === OTP) {
    // OTP is correct, proceed with password reset logic
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.params; // email from the route params
  const { newPassword } = req.body; // new password from the body

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Hash the new password before saving it
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user's password
  user.password = hashedPassword;
  user.OTP = undefined; // clear OTP after successful reset
  await user.save();

  return res.status(200).json({
    message: "Password reset successfully",
  });
};

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

export const userSigninController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Signin successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during signin:", error); // Log the error
    res.status(500).json({ message: "Internal server error" });
  }
};

//file upload controller

// export const fileUploadController = async (req, res) => {
//   console.log(req.file); 
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" }); // 400 Bad Request status code indicates that the request could not be understood by the server due to malformed syntax.
//   }
//   res.status(401).json( {message : "File Upload successfully", filePath : req.file.path});
// };


// export const getUserProfileController = async (req, res, next) => {
//   try {
//     // The userId is extracted from the JWT token via middleware
//     const user = await User.findById(req.userId).select('-password -emailToken -OTP'); // Exclude sensitive fields
//     if (!user) {
//       throw new customError(404, "User not found");
//     }

//     res.status(200).json({
//       message: "Profile fetched successfully",
//       user: {
//         id: user._id,
//         fname: user.fname,
//         lname: user.lname,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//         location: user.location || "", // Add if exists in schema
//         bio: user.bio || "",          // Add if exists in schema
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// router.post("/api/apply-job/:userId/:jobId", async (req, res, next) => {
//   try {
//     const { jobId, userId } = req.params;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     user.appliedJobs.push(jobId);
//     await user.save();

//     res.json({ success: true, message: "Job applied successfully", appliedJobs: user.appliedJobs });
//   } catch (error) {
//     next(error);
//   }
// });




// export const profileChange = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Update text fields from req.body
//     const { fname, email, phone, bio, address } = req.body; // Added 'address'
//     if (fname) user.fname = fname;
//     if (email) user.email = email;
//     if (phone) user.phone = phone;
//     if (bio) user.bio = bio;
//     if (address) user.address = address; // Update address if provided
//     console.log("Received bio:", bio);
//     console.log("Received email:", email);
//     console.log("Received address:", address); // Debugging line for address

//     // Handle image upload if provided
//     if (req.file) {
//       user.profileImage = req.file.path; // Cloudinary URL
//     }

//     await user.save();

//     res.json({
//       message: "Profile updated successfully",
//       user: {
//         _id: user._id,
//         fname: user.fname,
//         email: user.email,
//         phone: user.phone,
//         bio: user.bio,
//         address: user.address, // Include address in response
//         profileImage: user.profileImage,
//       },
//     });
//     console.log("Updated user:", user);
//   } catch (error) {
//     console.error("Update Error:", error.message);
//     res.status(500).json({ message: error.message || "Server Error" });
//   }
// };
// Routes definition


// Profile Controller
export const profileChange = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Common fields that both employee and employer can update
    const {
      fname,
      email,
      phone,
      bio,
      address
    } = req.body;
    
    // Update common fields if provided
    if (fname) user.fname = fname;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;
    if (address) user.address = address;
    
    // Employer-specific fields
    if (user.role === "employer") {
      const {
        companyName,
        companyPhone,
        companyAddress,
        industry,
        companySize,
        companyDescription
      } = req.body;
      
      // Update employer-specific fields if provided
      if (companyName) user.companyName = companyName;
      if (companyPhone) user.companyPhone = companyPhone;
      if (companyAddress) user.companyAddress = companyAddress;
      if (industry) user.industry = industry;
      if (companySize) user.companySize = companySize;
      if (companyDescription) user.companyDescription = companyDescription;
    }
    
    // Handle image upload if provided
    if (req.file) {
      user.profileImage = req.file.path; // Cloudinary URL
    }
    
    await user.save();
    
    // Prepare response based on role
    const responseUser = {
      _id: user._id,
      fname: user.fname,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
      address: user.address,
      profileImage: user.profileImage,
      role: user.role
    };
    
    // Add employer-specific fields to response if user is employer
    if (user.role === "employer") {
      Object.assign(responseUser, {
        companyName: user.companyName,
        companyPhone: user.companyPhone,
        companyAddress: user.companyAddress,
        industry: user.industry,
        companySize: user.companySize,
        companyDescription: user.companyDescription
      });
    }
    
    res.json({
      message: "Profile updated successfully",
      user: responseUser
    });
    
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// Define middleware
export const profileMiddleWare = upload.single('profileImage');
export const resumeMiddleWare = upload.single('resume');

// Resume Upload Controller
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a resume file' });
    }
    
    const userId = req.params.id; // Fixed to match route parameter
    const resumeUrl = req.file.path;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { resume: resumeUrl },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'Resume uploaded successfully', user: user });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};