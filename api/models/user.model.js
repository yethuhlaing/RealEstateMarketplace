import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Uhw65-9Ms8c9BIi_6pjiY9zS-2IF3KtubGN6E7OkemFrfs2lHXHjubErlie9MlN-1To&usqp=CAU",
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;