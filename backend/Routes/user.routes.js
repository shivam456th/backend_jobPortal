import express from "express";
import jwt from "jsonwebtoken";
import {
  userSignupController,
  userMailController,
  passwordRest,
  verifyOTP,
  resetPassword,
  userSigninController,
  profileChange,
  profileMiddleWare,
  resumeMiddleWare,
  uploadResume,
} from "../Controllers/user.controller.js";
import asyncHandle from "../Utils/asyncHandle.js";
import { userAuth } from "../Middlewares/userAuth.js";
import { storage } from "../Middlewares/multer.js";
import multer from "multer";
import User from "../Models/user.model.js";
import { allJobs, applyForJob, createJob, deleteApiCompany, deleteAppliedJob, getJobById, getUserAppliedJobs } from "../Controllers/jobs.controller.js";
import Job from "../Models/job.model.js";
// import { applyJobController } from "../Controllers/jobs.controller.js";
export const routes = express.Router();

//api endpoints for user

routes.post("/signup", asyncHandle(userSignupController));
routes.get("/verification/:id/:emailtoken", asyncHandle(userMailController));
routes.post("/forgot-password", asyncHandle(passwordRest));
routes.post("/verify-otp/:email", asyncHandle(verifyOTP));
routes.post("/reset-password/:email", asyncHandle(resetPassword));
routes.post("/signin", asyncHandle(userSigninController));
routes.get("/sign", (req, res) => {
  const token = jwt.sign({ name: "shivam" }, "12345", { expiresIn: "10s" });
  res.set("authorization", `Bearer ${token}`);
  res.send("Authorization Header set successfully");
});
routes.get("/apply", userAuth, (req, res) => {
  // const {name}=req.user;
  // res.send(`Welcome User ${name}` );
  res.send("Welcome");
});
routes.get("/jobs", allJobs)
routes.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("fname email phone profileImage");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
// const upload = multer({ storage, limits: { fileSize: 3 * 1024 * 1024 } });
const upload = multer({ storage });

// ✅ Profile Image Upload API
// routes.post("/profile/upload/:id", upload.single("profileImage"), async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // ✅ Cloudinary URL use karo (req.file.path mat use karo)
//     user.profileImage = req.file.path; // ✅ Correct property

//     await user.save();

//     res.json({ message: "Profile image updated successfully", profileImage: user.profileImage });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });
// routes.put("/profile/upload/:id", upload.single("profileImage"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.profileImage = req.file.path; // Cloudinary URL
//     await user.save();

//     res.json({ message: "Profile image updated successfully", profileImage: user.profileImage });
//   } catch (error) {
//     console.error("Upload Error:", error.message);
//     res.status(500).json({ message: error.message || "Server Error" });
//   }
// });
;

// Update profile (including image upload)
routes.post("/createJob",createJob)
routes.post('/jobs/:id',getJobById)
routes.post('/apply',applyForJob)
routes.get('/user/:userId/applied-jobs',getUserAppliedJobs)
routes.delete('/applied-jobs/:id', deleteAppliedJob );
routes.delete('/createdjobs/:id', deleteApiCompany)
routes.put('/update/jobs/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const updatedJobData = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, updatedJobData, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, job: updatedJob, message: 'Job updated successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((el) => el.message);
      return res.status(400).json({ success: false, message: 'Validation error', errors });
    }

    console.error('Error updating job:', err);
    res.status(500).json({ success: false, message: 'Failed to update job', error: err.message });
  }
});
routes.put("/profile/:id", profileMiddleWare, profileChange);
routes.put("/uploadResume/:id", resumeMiddleWare, uploadResume);

// routes.get('/profile', getUserProfileController);


// routes.post("/upload", upload.single("profile"), fileUploadController);

// routes.post("apply/:jobId", asyncHandle(applyJobController))


// DELETE endpoint to remove an applied job
