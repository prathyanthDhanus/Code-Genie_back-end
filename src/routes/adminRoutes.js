const express = require("express");
const router = express.Router();
const admin = require("../controller/adminController");






router.post("/admin/login",admin.adminLogin);










module.exports  = router