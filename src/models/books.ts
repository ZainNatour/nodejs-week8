import { sequelize, DataTypes } from "../database/sequelize";
import Rent from "./rents";
import User from "./users";

const Book = sequelize.define("book", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: true },
  isbn: { type: DataTypes.STRING, allowNull: false, unique: true },
  gerne: {
    type: DataTypes.ENUM(
      "fiction",
      "non-fiction",
      "mystery/thriller",
      "romance",
      "fantacy"
    ),
    defaultValue: "fiction",
    allowNull: false,
  },
  author: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});
// Associations
User.hasMany(Rent);
Book.hasMany(Rent);
Rent.belongsTo(User);
Rent.belongsTo(Book);
export default Book;
