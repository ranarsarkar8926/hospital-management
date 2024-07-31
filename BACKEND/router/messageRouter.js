import express from "express";
import {getAllMessages,sendMessage} from "../controller/messageController.js";
import {isAdminAthenticated} from '../middlewares/auth.js';

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall",isAdminAthenticated,getAllMessages)

export default router;