import { Router } from "express";
import * as controller from "../controllers/controller.js";

const router = Router();

router.post("/attendance", controller.markAttendance);
router.get("/attendance", controller.findAttendance);
router.get("/classes/:id/attendance", controller.listAllStudentsInClass);
router.get("/students/:id/attendance", controller.listStudentAttendance);

export default router;
