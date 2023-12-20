const mongoose = require('mongoose')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AppError = require('../middleware/appError.middleware')
const throwError = require('../helper/throwError')

const register = async (req, res, next) => {
    try {
        let { name, email, password, image } = req.body
        //Check if user exists 
        let userExists = await User.findOne({ email: email });
        if (userExists) {
            throwError('User already exists', 403);
            return;

        } else {
            // Hash the password before saving to the database
            const hashedPassword = await bcrypt.hash(password, 10);

            let newUser = await new User({
                email,
                password: hashedPassword,
                image,
                name
            }).save();

            if (!newUser) {
                throwError('Error creating a user', 500);

            } else {
                res.status(200).json({
                    newUser
                })
            }
        }
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }

}

const login = async (req, res, next) => {
    try {
        let { email, password } = req.body
        //Check if user exists 
        let user = await User.findOne({ email: email });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) {
                throwError('Invalid email or password', 401)
                return;
            }
            let token = generateToken(user);
            res.status(200).json({
                message: 'Logged In Successfully',
                user,
                token
            })
        } else {
            throwError('Invalid email or password', 401)
            return;
        }
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
}

const generateToken = (user) => {
    const secretKey = process.env.SECRET_KEY
    const token = jwt.sign({ userId: user._id, username: user.name }, secretKey, { expiresIn: '1h' });
    return token;
};
module.exports = { register, login }