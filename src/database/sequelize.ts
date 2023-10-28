import { Sequelize, DataTypes } from "sequelize";

console.log(process.env.DB1P);
const sequelize = new Sequelize("library_nodejs", "root", "root123", {
  host: "localhost",
  dialect: "mysql",
});

export { sequelize, DataTypes };
