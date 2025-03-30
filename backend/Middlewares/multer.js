import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Allowed formats
const allowedFormats = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
];

// Cloudinary Storage Configuration
export const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    if (!allowedFormats.includes(file.mimetype)) {
      throw new Error("Only PNG, JPG, JPEG, and PDF files are supported");
    }

    const isImage = file.mimetype.startsWith("image/");
    return {
      folder: isImage ? "images" : "resumes", // Corrected folder name for PDFs
      format: file.mimetype.split("/")[1], // e.g., "png", "pdf"
      public_id: `${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`,
      resource_type: file.mimetype === "application/pdf" ? "raw" : "image",
    };
  },
});

// Multer instance with limits and validation
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1, // Single file upload
  },
  fileFilter: (req, file, cb) => {
    if (!allowedFormats.includes(file.mimetype)) {
      return cb(new Error("Only PNG, JPG, JPEG, and PDF files are supported"));
    }
    cb(null, true);
  },
});