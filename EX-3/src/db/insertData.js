import sequelize from "../db/database.js";
import Student from "../models/student.js";
import Class from "../models/class.js";
import AttendanceRecord from "../models/attendanceRecord.js";
async function createSampleData() {
  try {
    // Clear existing data (optional - for development only)
    await sequelize.sync({ force: true });
    console.log("Database tables created!");

    // Create 10 Students
    const students = await Student.bulkCreate(
      [
        {
          Name: "John Smith",
          Gender: "Male",
          Email: "john.smith@example.com",
          PhoneNumber: "1234567890",
          Birthdate: new Date(2000, 0, 15),
        },
        {
          Name: "Emily Johnson",
          Gender: "Female",
          Email: "emily.j@example.com",
          PhoneNumber: "2345678901",
          Birthdate: new Date(2001, 3, 22),
        },
        {
          Name: "Michael Brown",
          Gender: "Male",
          Email: "michael.b@example.com",
          PhoneNumber: "3456789012",
          Birthdate: new Date(1999, 6, 10),
        },
        {
          Name: "Sarah Davis",
          Gender: "Female",
          Email: "sarah.d@example.com",
          PhoneNumber: "4567890123",
          Birthdate: new Date(2000, 8, 5),
        },
        {
          Name: "Robert Wilson",
          Gender: "Male",
          Email: "robert.w@example.com",
          PhoneNumber: "5678901234",
          Birthdate: new Date(2001, 1, 30),
        },
        {
          Name: "Jennifer Lee",
          Gender: "Female",
          Email: "jennifer.l@example.com",
          PhoneNumber: "6789012345",
          Birthdate: new Date(2000, 11, 12),
        },
        {
          Name: "David Taylor",
          Gender: "Male",
          Email: "david.t@example.com",
          PhoneNumber: "7890123456",
          Birthdate: new Date(1999, 4, 18),
        },
        {
          Name: "Jessica Martinez",
          Gender: "Female",
          Email: "jessica.m@example.com",
          PhoneNumber: "8901234567",
          Birthdate: new Date(2001, 7, 25),
        },
        {
          Name: "Daniel Anderson",
          Gender: "Male",
          Email: "daniel.a@example.com",
          PhoneNumber: "9012345678",
          Birthdate: new Date(2000, 2, 8),
        },
        {
          Name: "Amanda Thomas",
          Gender: "Female",
          Email: "amanda.t@example.com",
          PhoneNumber: "0123456789",
          Birthdate: new Date(1999, 9, 14),
        },
      ],
      { returning: true }
    );

    // Create 10 Classes
    const classes = await Class.bulkCreate(
      [
        { className: "Mathematics 101", roomNumber: "A101" },
        { className: "English Literature", roomNumber: "B205" },
        { className: "Computer Science", roomNumber: "C304" },
        { className: "Physics", roomNumber: "D412" },
        { className: "Chemistry", roomNumber: "E109" },
        { className: "History", roomNumber: "F202" },
        { className: "Biology", roomNumber: "G307" },
        { className: "Art", roomNumber: "H115" },
        { className: "Music", roomNumber: "I208" },
        { className: "Physical Education", roomNumber: "J310" },
      ],
      { returning: true }
    );

    // Create 10 Attendance Records
    const attendanceRecords = await AttendanceRecord.bulkCreate([
      {
        Date: new Date(2023, 0, 10),
        Status: "present",
        StudentId: 1,
        ClassId: 1,
      },
      {
        Date: new Date(2023, 0, 10),
        Status: "absent",
        StudentId: 2,
        ClassId: 1,
      },
      {
        Date: new Date(2023, 0, 11),
        Status: "late",
        StudentId: 3,
        ClassId: 2,
      },
      {
        Date: new Date(2023, 0, 11),
        Status: "present",
        StudentId: 4,
        ClassId: 2,
      },
      {
        Date: new Date(2023, 0, 12),
        Status: "present",
        StudentId: 5,
        ClassId: 3,
      },
      {
        Date: new Date(2023, 0, 12),
        Status: "present",
        StudentId: 6,
        ClassId: 3,
      },
      {
        Date: new Date(2023, 0, 13),
        Status: "present",
        StudentId: 7,
        ClassId: 4,
      },
      {
        Date: new Date(2023, 0, 13),
        Status: "absent",
        StudentId: 8,
        ClassId: 4,
      },
      {
        Date: new Date(2023, 0, 14),
        Status: "present",
        StudentId: 9,
        ClassId: 5,
      },
      {
        Date: new Date(2023, 0, 14),
        Status: "late",
        StudentId: 10,
        ClassId: 5,
      },
    ]);
    console.log("Sample data created successfully!");
  } catch (error) {
    console.error("Error creating sample data:", error);
  }
}

createSampleData();
export default createSampleData;
