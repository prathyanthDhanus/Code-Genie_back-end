const mongoose = require('mongoose');

// Create a schema for the attendance record
const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  attendanceRecords: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student', // Reference to the Student model
        required: true,
      },
      status: {
        type: String,
        enum: ['Present', 'Absent', 'Late'],
        default: 'Absent',
        required: true,
      },
    },
  ],
});

// Create the Attendance model using the attendanceSchema
const attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = attendance;