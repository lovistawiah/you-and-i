const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    lastSeen:{
        type: String
    },
    channels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "channel"
    }]
}, { timestamps: true });
userSchema.index({ channels: 1, 'channels.messages': -1 })

const User = mongoose.model('user', userSchema);

module.exports = User;