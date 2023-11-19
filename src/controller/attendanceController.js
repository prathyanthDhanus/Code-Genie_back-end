const student = require("../model/studentSchema");
const attendance = require("../model/attendanceSchema");

const createAttendance = async (req, res) => {
  // console.log("ss");
  const id = req.params.id
  const { date, status } = req.body;
  // console.log(id,date,status);
  const Student = await student.findById({ _id: id });
  // console.log(Student);

  // const parsedDate = new Date(date);
  // console.log(parsedDate);
  // Create the attendance record
  const attendanceRecord = new attendance({
    student: Student._id,
    // date: date,
    status: status
  });
// console.log(attendanceRecord);
  // Save the attendance record
  await attendanceRecord.save();
  return res.status(200).json({

    status: "success",

    message: "Attendance recorded successfully",

  })
}


module.exports = { createAttendance }