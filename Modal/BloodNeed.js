const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const bloocNeedSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    bloodType: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    unitsRequired: {
        type: Number,
    },
    reasonForRequest: {
        type: String,
    },
    requestDate: {
        type: Date,
    },
    location: {
        type: String,
    },
    donationBy: [
        { type: Schema.Types.ObjectId, ref: 'Donation' }
    ],
    isReceived: { type: Boolean, default: false }
})

module.exports = model("BloodNeed", bloocNeedSchema);