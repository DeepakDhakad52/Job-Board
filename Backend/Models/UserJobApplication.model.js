const mongoose = require('mongoose')


const UserJobApplicationSchema = mongoose.Schema({
    user: String,
    status: Boolean,
    candidateName: String,
    jobData: Object

}, {
    versionKey: false
})




const UserJobApplicationModel = mongoose.model('userjobapplications', UserJobApplicationSchema)

module.exports = {
    UserJobApplicationModel
}