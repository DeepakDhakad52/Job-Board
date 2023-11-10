const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: Number,
    role: String,
    register_date: {
        type: Date,
        default: Date.now // Sets the default value to the current date and time
    }
}, {
    versionKey: false
})




const UserModel = mongoose.model('users', UserSchema)

module.exports = {
    UserModel
}