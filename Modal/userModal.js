const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
    },
    password: {
        type: String,
    },
    email: { type: String },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    bloodType: {
        type: String,
    }
})

userSchema.pre("save", function (next) {
    const IST_OFFSET = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
    const currentIST = new Date(new Date().getTime() + IST_OFFSET);
    this.createdAt = currentIST;
    this.created_at = currentIST;
    this.updatedAt = currentIST;
    next();
});

module.exports = model("User", userSchema);
