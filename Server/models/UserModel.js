const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            // required: true,
            unique: true,
            min: 8
        },
        email: {
            type: String,
            // required: true,
            unique: true
        },
        password: {
            type: String,
            // required: true,
            min: 8
        },
        fullname: {
            type: String,
            // required: true,
        },
        goal: {
            type: String,
            // required: true,
        },
        age: {
            type: Number,
            // required: true,
        },
        height: {
            type: Number,
            // required: true,
        },
        charts: {
            weight: [

            ],
            height: Array
        }
    },
    { collection: 'user_data' }
)

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel