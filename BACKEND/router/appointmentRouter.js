import express from 'express';
import {postAppointment,getAllAppointments,updateAppointmentStatus,deleteAppointment} from '../controller/appointmentcontroller.js';
import {isAdminAthenticated,isPatientAthenticated} from '../middlewares/auth.js';

const router = express.Router();

router.post("/post",isPatientAthenticated,postAppointment);
router.get("/getall",isAdminAthenticated,getAllAppointments);
router.put("/update/:id", isAdminAthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAthenticated, deleteAppointment);


export default router;