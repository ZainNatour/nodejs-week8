"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../database/sequelize");
const Rent = sequelize_1.sequelize.define("rent", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    notes: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    state: {
        type: sequelize_1.DataTypes.ENUM("rented", "returned"),
        defaultValue: "rented",
        allowNull: false,
    },
});
exports.default = Rent;
