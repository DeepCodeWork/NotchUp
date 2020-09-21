const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },

    courseName: {
        type: String,
        required: true,
        trim: true
    },

    courseDate:{
        type: Date
    }

}, {timestamps: true});

const User = mongoose.model('user', userSchema);

module.exports = User;