import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./Database/db.connection.js";
import { routes } from "./Routes/user.routes.js";
import cookieParser from "cookie-parser";
// import Job from "./models/job.model.js";
import multer from "multer";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
(async () => {
  await dbConnect();
  app.listen(PORT, () => {
    console.log("server is running on", PORT);
  });
})();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ extended: true, limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.use("/api", routes);

// 🟢 Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Uploads folder me save karega
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename banayega
  },
});

const upload = multer({ storage });

// 🟢 API for Profile Image Upload
app.post("/api/upload", upload.single("profile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// ✅ Ensure `uploads` folder is accessible
app.use("/uploads", express.static("uploads"));

// app.post("/api/jobs", async (req, res) => {
//   try {
//     const newJob = await Job.create(req.body);
//     res.json({ message: "Job Added Successfully!", job: newJob });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get("/api/jobs", async (req, res) => {
//   try {
//     const jobs = await Job.find({});
//     res.json(jobs);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Error Handling Middleware
app.use((err, req, res, next) => {
  const status = err.statuscode || 500;
  const message = err.message || "internal server error";
  console.log(`App failed with status ${status} and error ${message}`);
});
