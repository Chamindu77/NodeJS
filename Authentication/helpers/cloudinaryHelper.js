const cloudinary = require('../config/cloudinary');

const uploadCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file);
    return {
        url : result.secure_url,
        publicId : result.public_id,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error uploading file to cloudinary');
  }
};

module.exports = {
  uploadCloudinary,
};