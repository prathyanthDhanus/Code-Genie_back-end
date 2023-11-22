const attendance = require("../model/attendanceSchema");

const createAttendance = async (req, res) => {
  // console.log("ss");
  const id = req.params.id
  const { date, status } = req.body;
  // console.log(id,date,status);
  const existingDate = await attendance.findOne({ date });

  if (existingDate) {
    // Find the student within the attendanceRecords array
    const findStudent = existingDate.attendanceRecords.find(
      (record) => record.student.toString() === id
    );
    console.log(findStudent);

    if (findStudent) {
      // If the student exists for the given date, update the status
      findStudent.status = status;
    } else {
      // If the student doesn't exist, add a new attendance record
      existingDate.attendanceRecords.push({ student: id, status });
    }

    // Save the changes to the attendance record
    await existingDate.save();
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
  });
}


module.exports = { createAttendance }