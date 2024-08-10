import mongoose from "mongoose";

const hirerWorkerSchema = new mongoose.Schema({
    application_id: {
        type: String,
        required: true
    },
    worker: {
        type: String,
        required: true
    },
    status: {
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

const HirerWorker = mongoose.model('HirerWorker', hirerWorkerSchema);

export default HirerWorker;