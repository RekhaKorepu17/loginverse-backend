import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection";
import { UserAttributes } from "./userType";

const User = sequelize.define(
  "User",
  {
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["firstName", "lastName"],
      },
    ],
  }
);
export default User;