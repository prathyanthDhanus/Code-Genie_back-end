const mongoose = require('mongoose');

// Create a schema for the attendance record
const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student', // Reference to the Student model
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['present', 'absent','late'],
    required: true,
  },
});

// Create the Attendance model using the attendanceSchema
const attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = attendance;