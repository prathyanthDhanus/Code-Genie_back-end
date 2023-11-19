const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
   domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Domain', // Reference to the Domain schema
      required: true,
   },
   category: {
      type: String,
      required: true,
   },
   week: {
      type: String,
      required: true,
   },
   questions: {
      type: String,
      required: true,
   },
   optionA: {
      type: String,
      required: true,
   },
   optionB: {
      type: String,
      required: true,
   },
   optionC: {
      type: String,
      required: true,
   },
   correctAnswer: {
      type: String,
      required: true,
   }

})


const question = mongoose.model("question", questionSchema)
module.exports = question