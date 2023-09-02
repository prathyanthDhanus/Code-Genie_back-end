const express = require("express");
const router = express.Router();
const student = require("../controller/studentController");
const tryCatch = require("../middleware/tryCatch")


router.post("/student/profile",tryCatch(student.createProfile));
router.post("/student/login",tryCatch(student.studentLogin));





module.exports = router;