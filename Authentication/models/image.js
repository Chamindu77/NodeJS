const mongoose = require('mongoose');
const User = require('./user');

const imageSchema = new mongoose.Schema({
    url : {
        type: String,
        required: true
    },
    publicId : {
        type: String,
        required: true
    },
    UserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    }

},{timestamps : true});

module.exports = mongoose.model('Image', imageSchema);