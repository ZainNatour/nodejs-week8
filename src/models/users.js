"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../database/sequelize");
const User = sequelize_1.sequelize.define("user", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    password: { type: sequelize_1.DataTypes.STRING },
    birthdate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
});
exports.default = User;
