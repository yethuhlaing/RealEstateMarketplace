import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"

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
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);



app.listen(PORT, HOST, ()=> {
    console.log(`API listening: http://${HOST}:${PORT}`);
})