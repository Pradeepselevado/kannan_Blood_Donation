const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const donationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    bloodType: { type: String, },
    location: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    documentFile: {
        type: String,
    },
    donatedHistory: [
        {
            donationId: { type: Schema.Types.ObjectId, ref: 'BloodNeed' },
            donationDate: { type: Date, default: Date.now }
        }
    ],
    lastDonationDate: {
        type: Date,
    },
})


module.exports = model("Donation", donationSchema);

