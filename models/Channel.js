const mongoose = require('mongoose');
const privateChannelSchema = require('./PrivateChannel');
const groupChannelSchema = require('./groupChannel');


const channelSchema = new mongoose.Schema({
    privateChannel: {
        type: privateChannelSchema
    },
    groupChannel: {
        type: groupChannelSchema
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "message"
    }]
}, { timestamps: true });
const Channel = mongoose.model('channel', channelSchema);

module.exports = Channel;
