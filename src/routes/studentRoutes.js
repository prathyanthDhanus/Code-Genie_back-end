const express = require("express");
const router = express.Router();
const student = require("../controller/studentController");



router.post("/student/profile",student.profileDetails)






module.exports = router;