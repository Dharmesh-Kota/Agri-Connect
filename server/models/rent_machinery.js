import mongoose from "mongoose";

const rentMachinerySchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['ongoing', 'completed'],
        required: true
    },
    worker_rating: {
        type: Number,
        required: true,
        default: 0
    },
    hirer_rating: {
        type: Number,
        required: true,
        default: 0
    }
},{
    timestamps: true
});

const RentMachinery = mongoose.model('RentMachinery', rentMachinerySchema);

export default RentMachinery;