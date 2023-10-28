import { sequelize, DataTypes } from "../database/sequelize";
import Book from "./books";
import User from "./users";

const Rent = sequelize.define("rent", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  notes: { type: DataTypes.STRING, allowNull: true },
  state: {
    type: DataTypes.ENUM("rented", "returned"),
    defaultValue: "rented",
    allowNull: false,
  },
});

export default Rent;
