import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import errorHandler from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { username , email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username,email,password: hashPassword});
    try {
        await newUser.save();
        res.status(201).json("User Created Successfully!");
    } catch (error) {
        next()
    }
    console.log(newUser)
}
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({email});
        if (!validUser) return next(errorHandler(404, 'User not Found!'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong Credentials!'));
        // Make JWT token
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        // leave password Info
        const {password: pass, ...rest} = validUser._doc; 
        res.cookie('access_token', token, { httpOnly: true})
            .status(200)
            .json(rest)
    } catch (error) {
        next(error)
    }
}