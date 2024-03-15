const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Ensure 'uploads' folder exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imgPath = req.body.img_path || ''; // Use provided img_path or default to root
    const fullPath = path.join(uploadPath, imgPath);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    // Generate a random filename to prevent conflicts
    const randomFileName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, randomFileName + ext);
  },
});

const fileFilter = (req, file, cb) => {
  // Validate file format (JPG or JPEG)
  const allowedFormats = ['.jpg', '.jpeg'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedFormats.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Only JPG or JPEG allowed.'));
  }
};

const upload = multer({ storage, fileFilter });

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(uploadPath));

// Endpoint for uploading images
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const imageUrl = `/uploads/${req.body.img_path || ''}${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
