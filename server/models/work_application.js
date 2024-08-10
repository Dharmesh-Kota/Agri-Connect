import mongoose from "mongoose";

const workApplicationSchema = new mongoose.Schema({
    application_id: {
        type: String,
        required: true
    },
    hirer: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        required: true
    },
    workers_required: {
        type: Number,
        required: true,
        default: 0
    },
    closing_date: {
        type: Date,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    applicants: {
        type: [String]
    },
    labour: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

const WorkApplication = mongoose.model('WorkApplication', workApplicationSchema);

export default WorkApplication;