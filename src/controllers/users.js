"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.signup = exports.logout = exports.login = void 0;
const users_1 = __importDefault(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Use type assertions to inform TypeScript about the structure of req.user
    const { user, token } = req.user; // Use 'any' for type assertion
    // You can add additional user data you want to send in the response here
    const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
    };
    res.status(200).json({
        user: userData,
        token,
    });
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.logout = logout;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, birthdate } = req.body;
    if (!username || !email || !password || !birthdate) {
        return res.status(400).send({ error: "Provide all the required fields." });
    }
    const exists = yield users_1.default.findOne({ where: { email: email } });
    if (exists) {
        return res.status(400).send({ error: "Email already exists" });
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield users_1.default.create({
            username,
            email,
            password: hashedPassword,
            birthdate,
        });
        res.status(200).json(newUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error.");
    }
});
exports.signup = signup;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("get all users route");
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("get user by id route");
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Update user route");
});
exports.updateUser = updateUser;
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Delete user route");
});
exports.removeUser = removeUser;
