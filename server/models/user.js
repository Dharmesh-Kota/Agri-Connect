import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contact: String,
    address: String,
    birthdate: Date,
    experience: String,
    contact: String
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;