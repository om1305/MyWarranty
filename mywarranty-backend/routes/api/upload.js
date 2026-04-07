
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const auth = require('../../middleware/auth');
// // const tesseract = require('tesseract.js'); // Placeholder for OCR library

// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// // Init upload
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10000000 }, // 10MB limit
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//     }
// }).single('image'); // 'image' is the field name in the form

// // Check File Type
// function checkFileType(file, cb) {
//     // Allowed ext
//     const filetypes = /jpeg|jpg|png|pdf/;
//     // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only (jpeg, jpg, png, pdf)!');
//     }
// }

// // @route   POST api/upload
// // @desc    Upload image for warranty or bill
// // @access  Private
// router.post('/', auth, (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             res.status(400).json({ msg: err });
//         } else {
//             if (req.file == undefined) {
//                 res.status(400).json({ msg: 'No file selected!' });
//             } else {
//                 // File uploaded successfully
//                 // Here you would typically save the file path to the corresponding warranty or bill
//                 // And integrate OCR processing
//                 // Example OCR placeholder:
//                 /*
//                 const { data: { text } } = await tesseract.recognize(
//                     req.file.path,
//                     'eng',
//                     { logger: m => console.log(m) }
//                 );
//                 console.log(text);
//                 // Logic to parse 'text' and extract relevant data for auto-filling
//                 */
//                 res.json({
//                     msg: 'File uploaded',
//                     imageUrl: `/uploads/${req.file.filename}`,
//                     // extractedData: {}
//                 });
//             }
//         }
//     });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const streamifier = require("streamifier");
const auth = require("../../middleware/auth");
const cloudinary = require("../../config/cloudinary");

console.log("Cloudinary object:", cloudinary);
console.log("Cloudinary uploader:", cloudinary.uploader);
// Use memory storage instead of local disk storage
const storage = multer.memoryStorage();

// Init upload
const upload = multer({
  storage,
  limits: { fileSize: 10000000 }, // 10MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

// Check file type
function checkFileType(file, cb) {
  const allowedExt = /jpeg|jpg|png|pdf/;
  const extname = allowedExt.test(path.extname(file.originalname).toLowerCase());
  const mimetype =
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf";

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error("Only jpeg, jpg, png, and pdf files are allowed"));
}

// Helper: upload buffer to Cloudinary
function uploadToCloudinary(fileBuffer, originalname, mimetype) {
  return new Promise((resolve, reject) => {
    const isPdf = mimetype === "application/pdf";

    const uploadOptions = {
      folder: "mywarranty_uploads",
      resource_type: isPdf ? "raw" : "image",
      public_id: `${Date.now()}-${path.parse(originalname).name}`
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-_]/g, ""),
    };

    const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}

// @route   POST api/upload
// @desc    Upload image/pdf for warranty or bill
// @access  Private
router.post("/", auth, (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ msg: err.message || err });
      }

      if (!req.file) {
        return res.status(400).json({ msg: "No file selected!" });
      }

      const result = await uploadToCloudinary(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );

      return res.json({
        msg: "File uploaded successfully",
        imageUrl: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        originalName: req.file.originalname,
      });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return res.status(500).json({
        msg: "File upload failed",
        error: error.message,
      });
    }
  });
});

module.exports = router;