const Image = require('../models/image');
const {uploadCloudinary} = require('../helpers/cloudinaryHelper');
const fs = require('fs');

const uploadImage = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
    });
    }
    
    const {url, publicId} = await uploadCloudinary(req.file.path)

    const newlyUploadedImage = new Image({
      url,
      publicId,
      userId: req.userInfo.userId
    });

    await newlyUploadedImage.save();
    
    // Delete the file from the server
    fs.unlinkSync(req.file.path);

    res.status(201).json({ 
        success: true, 
        message: 'Image uploaded successfully',
        data: newlyUploadedImage
     });

  } catch (error) {
    console.log(error);
    res.status(500).json({ 
        success: false, 
        message: 'Error uploading image'
    });
  }
};

module.exports = {
  uploadImage
};