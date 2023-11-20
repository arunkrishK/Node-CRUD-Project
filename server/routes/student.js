const express= require("express");
const router =express.Router();
const studentController = require("../controllers/studentcontroller");

router.get("/",studentController.view);
router.get("/addstudent",studentController.addstudent);
router.post("/addstudent",studentController.save);

router.get("/editstudent/:id",studentController.editstudent);
router.post("/editstudent/:id",studentController.edit);



router.get("/deletestudent/:id",studentController.deletestudent);
// router.get('',(req,res)=>{
//    res.render("home");
// });


module.exports=router;
