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
exports.rentBook = void 0;
const rents_1 = __importDefault(require("../models/rents"));
const books_1 = __importDefault(require("../models/books"));
const users_1 = __importDefault(require("../models/users"));
const rentBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if req.user is defined
        if (!req.user) {
            res.status(401).send("Not Authenticated");
            return;
        }
        // Now it's safe to access req.user.id using a type assertion
        const userId = req.user.id; // Using 'any' as a type assertion
        console.log(userId + "++++++++++++++++++++++++++++++++++++++++++++++++++++");
        const bookId = parseInt(req.params.id);
        const book = yield books_1.default.findByPk(bookId);
        if (!book) {
            return res.status(404).send("No Such Book Found");
        }
        // Create the rent object
        const rent = rents_1.default.build({
            notes: "notes",
            state: "rented",
            userId,
            bookId,
        });
        // Save the rent object to the database
        const savedRent = yield rent.save();
        console.log("Book Is Saved");
        const rentedBook = yield rents_1.default.findByPk(savedRent.id, {
            include: [books_1.default, users_1.default],
        });
        if (!rentedBook) {
            return res.status(404).send("No Such Rent Found");
        }
        return res.status(201).json(rentedBook);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.rentBook = rentBook;
