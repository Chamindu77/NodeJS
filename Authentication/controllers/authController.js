const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**  
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 */
exports.registerUser = async (req,res) => {
    try {
        const { username, email, password, role } = req.body;

        const existUser = await User.findOne({$or : [{username}, {email}]})
        
        if(existUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role : role || 'user'
        })
        await newUser.save();

        if(!newUser) {
            return res.status(400).json({
                success: false,
                message: "Error creating user"
            })  
        }
        res.status(201).json({
            success: true,
            message: "User created successfully"
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


/**
 * @route   POST /api/v1/auth/login
 * @desc    Login a user
 * @access  Public
 */
exports.loginUser = async (req,res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({username});
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Username"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({
            userId : user._id,
            username : user.username,
            email : user.email,
            role : user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
        } )

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

