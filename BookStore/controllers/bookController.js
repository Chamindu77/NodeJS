const Book = require('../models/book');

/**
 * Get all books
 * @route GET http://localhost:3000/api/v1/books/
 * @access Public
 */
exports.getAllBooks = async (req,res) => {
    try {
        const books = await Book.find();
        if (!books) {
            return res.status(404).json({
                success: false,
                message: 'No books found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });

    }
} 

/**
 * Get a book by id
 * @route GET http://localhost:3000/api/v1/books/:id
 * @access Public
 */
exports.getBookById = async (req,res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        });
        

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });

    }
}


/**
 * Create a new book
 * @route POST http://localhost:3000/api/v1/books/
 * @access Public
 */
exports.createBook = async (req,res) => {
    try {
        const getBookData = req.body;
        const createBook = await Book.create(getBookData);
        if (!createBook) {
            return res.status(400).json({
                success: false,
                message: 'Invalid book data'
            });
        }
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: createBook
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

/**
 * Update a book by id
 * @route PUT http://localhost:3000/api/v1/books/:id
 * @access Public
 */
exports.updateBook = async (req,res) => {
    try {
        const bookId = req.params.id;
        const updateBookData = req.body;
        const updateBook = await Book.findByIdAndUpdate(bookId,updateBookData,{new:true})
        if (!updateBook){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updateBook
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

/**
 * Delete a book by id
 * @route DELETE http://localhost:3000/api/v1/books/:id
 * @access Public
 */
exports.deleteBook = async (req,res) => {
    try {
        const bookId = req.params.id;
        const deleteBook = await Book.findByIdAndDelete(bookId); 
        if (!deleteBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: deleteBook
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

