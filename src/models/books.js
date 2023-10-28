"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../database/sequelize");
const rents_1 = __importDefault(require("./rents"));
const users_1 = __importDefault(require("./users"));
const Book = sequelize_1.sequelize.define("book", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    isbn: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    gerne: {
        type: sequelize_1.DataTypes.ENUM("fiction", "non-fiction", "mystery/thriller", "romance", "fantacy"),
        defaultValue: "fiction",
        allowNull: false,
    },
    author: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    year: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    quantity: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
});
// Associations
users_1.default.hasMany(rents_1.default);
Book.hasMany(rents_1.default);
rents_1.default.belongsTo(users_1.default);
rents_1.default.belongsTo(Book);
exports.default = Book;
