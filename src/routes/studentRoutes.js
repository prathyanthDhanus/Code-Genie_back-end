const express = require("express");
const router = express.Router();
const student = require("../controller/studentController");



router.post("/student/profile",student.createProfile)
router.post("/student/login",student.studentLogin)





module.exports = router;