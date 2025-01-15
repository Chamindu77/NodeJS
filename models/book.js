const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title :{
        type : String,
        required : [true, 'Title is required'],
        trim : true,
        maxLength : [50, 'Title should not be more than 50 characters']
    },
    auther :{
        type : String,
        required : [true, 'Auther is required'],
        trim : true,
        maxLength : [20, 'Auther should not be more than 20 characters']
    },
    year :{
        type : Number,
        required : [true, 'Year is required'],
        min : [1000, 'Year should be greater than 1000'],
        max : [new Date.getFullYear(), 'Year should be less than current year']
    },
    createAt :{
        type : Date,
        default : Date.now
    }
    
    
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;