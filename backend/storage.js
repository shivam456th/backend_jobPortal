import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary Config
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

// Cloudinary Storage
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: async (req, file) => {
      const Formats = ['image/png', 'image/jpeg', 'image/jpg'];
      return Formats.includes(file.mimetype) ? 'images' : 'resume';
    },
    format: async (req, file) => {
      const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
      if (!allowedFormats.includes(file.mimetype)) {
        throw new Error('Only png, jpg, jpeg and pdfs are supported');
      }
      return file.mimetype.split('/')[1];
    },
    public_id: (req, file) => `${Date.now()}_${file.originalname}`
  },
});

// Local Storage (Save file in `/Public/` folder)
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./Public/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Create folder if not exists
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Multer Upload Middleware
export const upload = multer({ 
  storage: cloudinaryStorage, 
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export const uploadLocal = multer({ 
  storage: localStorage, 
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});