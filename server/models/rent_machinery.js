import mongoose from "mongoose";

const rentMachinerySchema = new mongoose.Schema({
    rent_id: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        enum: [
            'Tractors',
            'Plowing & Tilling Equipment',
            'Planting & Seeding Equipment',
            'Irrigation Equipment',
            'Harvesting Equipment',
            'Crop Protection Equipment',
            'Hay & Forage Equipment',
            'Material Handling & Transport Equipment'
        ],
        required: true
    },
    rent: {
        type: Number,
        required: true,
    },
    quantity_available: {
        type: Number,
        required: true,
        default: 1
    },
    machinery_holder: {
        type: [String]
    }
},{
    timestamps: true
});

const RentMachinery = mongoose.model('RentMachinery', rentMachinerySchema);

export default RentMachinery;