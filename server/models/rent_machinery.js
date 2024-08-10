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
    machineryHolder: {
        type: [String]
    }
},{
    timestamps: true
});

const RentMachinery = mongoose.model('RentMachinery', rentMachinerySchema);

export default RentMachinery;