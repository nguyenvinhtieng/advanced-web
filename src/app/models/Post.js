const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    id_user: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    userAvatar: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Post = new Schema({
    id_user: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userAvatar: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
    },
    urlYoutube: {
        type: String,
    },
    comments: [Comment]
});

module.exports = mongoose.model('Post', Post);
