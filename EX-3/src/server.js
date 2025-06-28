import express, { json } from "express";
import cors from "cors";
import route from "./routes/route.js";
import sequelize from "./db/database.js";
import Student from "./models/student.js";
import Class from "./models/class.js";
import AttendanceRecord from "./models/attendanceRecord.js";
import Data from "./db/insertData.js";

const app = express();

try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("✅ Database connected and models synced");
} catch (err) {
  console.error("❌ Failed to connect or sync DB:", err);
}
app.use(cors());

app.use(json());

app.use(route);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
