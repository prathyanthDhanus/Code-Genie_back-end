const express = require("express");
const router = express.Router();
const admin = require("../controller/adminController");
const batch = require("../controller/batchController");
const topic = require("../controller/topicController");
const tryCatch = require ("../middleware/tryCatch");



//--------------------------student route---------------------------- 

router.post("/admin/login",tryCatch(admin.adminLogin));
router.post("/admin/student/register",tryCatch(admin.studentRegister));

router.get("/admin/student",tryCatch(admin.getAllStudents));
router.get("/admin/student/:id",tryCatch(admin.getStudentsbyId));

router.put("/admin/student/:id",tryCatch(admin.updateStudent));

router.delete("/admin/student/:id",tryCatch(admin.deleteStudent));

//--------------------------batch route-------------------------------

router.get("/admin/batch",tryCatch(batch.getAllBatch));
router.get("/admin/batch/:id",tryCatch(batch.detailOfaBatch));
router.get("/admin/batch/activate/status",tryCatch(batch.getActiveBatch));
router.get("/admin/batch/deactivate/status",tryCatch(batch.getDeactiveBatch));  
 
router.patch("/admin/batch/:id",tryCatch(batch.inActivateBatch))


//---------------------------topic route---------------------------

router.post("/admin/topic",tryCatch(topic.createTopic));

router.get("/admin/domain",tryCatch(topic.viewDomain));






module.exports  = router