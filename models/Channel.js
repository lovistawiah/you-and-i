const mongoose = require('mongoose');


const channelSchema = new mongoose.Schema({
    channelType: {
        type: String,
        enum: ["private", "group"],
        required: true,
        default: "private",
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }],
    Admin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    groupName: {
        type: String
    },
    avatar: {
        type: String
    },
    bio: {
        type: String
    },
    isBlocked: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });
const Channel = mongoose.model('channel', channelSchema);

module.exports = Channel;
