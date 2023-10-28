"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticate(req, res, next) {
    const authHeader = req.header("Authorization") || req.header("authorization");
    if (!authHeader)
        return res.status(401).send("No Token Provided");
    const token = authHeader.split(" ")[1];
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(403).send({ message: "Token is not valid" });
    }
}
exports.default = authenticate;
