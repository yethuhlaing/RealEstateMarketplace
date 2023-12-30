import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from 'cookie-parser';

dotenv.config()
const PORT = parseInt(process.env.PORT, 10);
const HOST = process.env.HOST;

mongoose.connect(process.env.MONGO).then( ()=> {
        console.log("Connected to Mongo!")
    }).catch( (err) => {
        console.log(err)
    })


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


app.listen(PORT, HOST, ()=> {
    console.log(`API listening: http://${HOST}:${PORT}`);
})