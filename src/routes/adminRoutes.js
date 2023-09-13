const express = require("express");
const router = express.Router();
const admin = require("../controller/adminController");
const tryCatch = require ("../middleware/tryCatch")





router.post("/admin/login",tryCatch(admin.adminLogin));
router.post("/admin/student/register",tryCatch(admin.studentRegister));

router.get("/admin/student",tryCatch(admin.getAllStudents));
router.get("/admin/student/:id",tryCatch(admin.getStudentsbyId));

router.put("/admin/student/:id",tryCatch(admin.updateStudent));

router.delete("/admin/student/:id",tryCatch(admin.deleteStudent))




module.exports  = router