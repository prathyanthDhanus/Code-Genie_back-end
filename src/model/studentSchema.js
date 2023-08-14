const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    fullName: String,
    eMail: String,
    phoneNumber: Number,
    fullAddress: String,
    pinCode: Number,
    bloodGroup: String,
    educationQualification: String,
    guardianName: String,
    guardianRelation: String,
    guardianPhoneNumber: Number
  
})









const student = mongoose.model("student",studentSchema)
module.exports = student