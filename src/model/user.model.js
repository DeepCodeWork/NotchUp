const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    parentName:{
        type : String,
        trim : true,
        required : true,
        maxlength : 32
    },

    parentEmail:{
        type : String,
        trim : true,
        unique : true,
        required : true,
        maxlength : 32,
        lowercase: true
    },

    parentMobile:{
        type: String,
        trim : true,
        required: true,
        maxlength:10
    },

    studentName:{
        type: String,
        trim: true,
        required: true
    },

    studentAge:{
        type: Number,
        required: true
    }

}, {timestamps: true});

const User = mongoose.model('user', userSchema);

module.exports = User;