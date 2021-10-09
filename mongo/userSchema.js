require('./connection');
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ //creating a schema for user
    mailID: { //Email ID of the user 
        type: String,
        required: [true, 'Email ID is a required']
    },
    status: { //status of subscription either true (subscribed) false (unsubscribed)
        type: Boolean,
        required: [true, 'Status of the subscription is required ']
    }
})

const user = mongoose.model('User', userSchema) // making model out of the schema with colletion name User

module.exports = user;