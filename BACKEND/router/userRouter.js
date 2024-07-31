import express from 'express';
import {addNewDoctor,logoutPatient,logoutAdmin,addNewAdmin,login,patientRegister,getAllDoctors,getUserDetails} from '../controller/userController.js';
import {isAdminAthenticated,isPatientAthenticated} from '../middlewares/auth.js';

const router = express.Router();

router.post("/patient/register",patientRegister);
router.post("/login",login);
router.post("/admin/addnew",isAdminAthenticated,addNewAdmin);
router.get("/doctors",getAllDoctors);
router.get("/admin/me",isAdminAthenticated,getUserDetails);
router.get("/patient/me",isPatientAthenticated,getUserDetails);
router.get("/admin/logout",isAdminAthenticated,logoutAdmin);
router.get("/patient/logout",isPatientAthenticated,logoutPatient);
router.post("/doctors/addnew",isAdminAthenticated,addNewDoctor);


export default router;