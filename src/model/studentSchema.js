const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
   userName:String,
   batch_Number:String,
   eMail:String,
   passWord:String,
   profile:[{
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
  
   }] 
})









const student = mongoose.model("student",studentSchema)
module.exports = student