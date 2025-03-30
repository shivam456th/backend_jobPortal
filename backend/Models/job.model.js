import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true }, // Using Number for salary
    skills: [{ type: String }], // Array of skills
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

const Job = mongoose.model("Job", jobSchema, "allJobs"); // Collection named "allJobs"
export default Job;
