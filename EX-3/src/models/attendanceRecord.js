import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";
import Student from "./student.js";
import Class from "./class.js";

const AttendanceRecord = sequelize.define(
  "AttendanceRecord",
  {
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Status: {
      type: DataTypes.ENUM("present", "absent", "late"),
      allowNull: false,
      defaultValue: "absent",
    },
  },
  {
    timestamps: true,
  }
);

Student.hasMany(AttendanceRecord, { foreignKey: "StudentId" });
AttendanceRecord.belongsTo(Student, { foreignKey: "StudentId" });

Class.hasMany(AttendanceRecord, { foreignKey: "ClassId" });
AttendanceRecord.belongsTo(Class, { foreignKey: "ClassId" });

export default AttendanceRecord;
