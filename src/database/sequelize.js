"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTypes = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "DataTypes", { enumerable: true, get: function () { return sequelize_1.DataTypes; } });
console.log(process.env.DB1P);
const sequelize = new sequelize_1.Sequelize("library_nodejs", "root", "root123", {
    host: "localhost",
    dialect: "mysql",
});
exports.sequelize = sequelize;
