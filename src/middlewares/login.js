"use strict";
// login.ts
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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
passport_1.default.use(new passport_local_1.Strategy({ passReqToCallback: true }, (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (yield users_1.default.findOne({
            where: { username },
        }));
        if (!user) {
            return done(null, false, {
                status: 401,
                message: "Incorrect username.",
            });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return done(null, false, {
                status: 401,
                message: "Incorrect password.",
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        req.user = {
            user,
        };
        req.token = token;
        return done(null, user, { token });
    }
    catch (error) {
        return done(error, false, {
            status: 500,
            message: "Internal server error",
        });
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findByPk(id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
exports.default = passport_1.default;
