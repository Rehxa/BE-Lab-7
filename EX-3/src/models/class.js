import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Class = sequelize.define(
  "Class",
  {
    classId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    className: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomNumber: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default Class;
