import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Student = sequelize.define(
  "Student",
  {
    studentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\d{10}$/, // Validates a 10-digit phone number
      },
    },
    Birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Student;
