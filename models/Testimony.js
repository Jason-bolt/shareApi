const mongoose = require('mongoose')
const User = require('./User')

const TestimonySchema = new mongoose.Schema({
    testimony: {
        type: String,
        required: true
    },
    
    tags: {
        type: Array
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Testimony', TestimonySchema)