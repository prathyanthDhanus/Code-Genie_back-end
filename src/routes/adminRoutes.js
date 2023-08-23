const express = require("express");
const router = express.Router();
const admin = require("../controller/adminController");






router.post("/admin/login",admin.adminLogin);
router.post("/admin/student/register",admin.studentRegister)









module.exports  = router