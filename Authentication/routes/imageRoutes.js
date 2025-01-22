const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const imageUploadMiddleware = require('../middleware/imageUploadMiddleware');

const { uploadImage } = require('../controllers/imageController');

const router = express.Router();

router.post(
    '/upload',
    authMiddleware, 
    adminMiddleware, 
    imageUploadMiddleware.single('image'), 
    uploadImage 
);

module.exports = router;
