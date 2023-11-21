const attendance = require("../model/attendanceSchema");

const createAttendance = async (req, res) => {
  // console.log("ss");
  const id = req.params.id
  const { date, status } = req.body;
  // console.log(id,date,status);
  const existingAttendance = await attendance.findOne({ date });

  if (existingAttendance) {
    // If the date exists, update the attendanceRecords array
    existingAttendance.attendanceRecords.push({ student: id, status });
    await existingAttendance.save();
  } else {
    // If the date doesn't exist, create a new attendance record
    const newAttendance = new attendance({
      date,
      attendanceRecords: [{ student: id, status }],
    });
    await newAttendance.save();
  }
  return res.status(200).json({

    status: "success",

    message: "Attendance recorded successfully",

  })
}


module.exports = { createAttendance }