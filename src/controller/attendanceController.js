const student = require("../model/studentSchema");
const attendance = require("../model/attendanceSchema");

const createAttendance = async (req,res)=>{
  // console.log("ss");
    const {id}=req.params
   console.log(id);
    const Student = await student.findById({_id:id});
    console.log(Student);

    // Create the attendance record
    const attendanceRecord = new attendance({
      student: id,
    
    });

    // Save the attendance record
    await attendanceRecord.save();
    return res.status(200).json({

      status: "success",
  
      message: "Attendance recorded successfully",
  
  })
}


module.exports = {createAttendance}