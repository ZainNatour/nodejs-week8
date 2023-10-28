import { sequelize, DataTypes } from "../database/sequelize";

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING },
  birthdate: { type: DataTypes.DATE, allowNull: false },
});

export default User;
