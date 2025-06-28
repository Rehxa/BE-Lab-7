import Student from "../models/student.js";
import Class from "../models/class.js";
import AttendanceRecord from "../models/attendanceRecord.js";

// POST /attendance?studentId=1&date=2025-06-17
export const markAttendance = async (req, res) => {
  try {
    const { classId, status } = req.body;
    const { studentId } = req.query;
    const date = req.query.date || new Date().toISOString().split("T")[0];

    if (!studentId || !classId || !date) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const findStudent = await Student.findOne({
      where: { studentId: studentId },
    });

    if (!findStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    const mark = await AttendanceRecord.create({
      Date: date,
      Status: status,
      StudentId: studentId,
      ClassId: classId,
    });

    return res.status(200).json(mark);
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /attendance?studentId=1&date=2025-06-17
export const findAttendance = async (req, res) => {
  try {
    const { studentId } = req.query;
    const date = req.query.date || new Date().toISOString().split("T")[0];

    if (!studentId || !date) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const findStudent = await Student.findOne({
      where: { studentId: studentId },
    });

    if (!findStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    const studentAttendance = await AttendanceRecord.findAll({
      where: { Date: date, StudentId: studentId },
    });
    return res.status(200).json(studentAttendance);
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get /classes/:id/attendance
export const listAllStudentsInClass = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const classAttendance = await Class.findAll({
      where: { classId: id },
      include: {
        model: AttendanceRecord,
        attributes: ["Date", "Status"],
        include: { model: Student, attributes: ["Name"] },
      },
    });
    return res.status(200).json(classAttendance);
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get /students/:id/attendance
export const listStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const findStudent = await Student.findOne({
      where: { studentId: id },
    });
    if (!findStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    const studentAttendance = await AttendanceRecord.findAll({
      where: { StudentId: id },
      include: [{ model: Class, attributes: ["className"] }],
      attributes: ["Date", "Status"],
    });

    return res.status(200).json({
      Sid: findStudent.studentId,
      Name: findStudent.Name,
      Attendance: studentAttendance,
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
