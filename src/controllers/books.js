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
exports.deleteBookById = exports.updateBookById = exports.CreateBook = exports.getBookById = exports.getBooks = void 0;
const books_1 = __importDefault(require("../models/books"));
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield books_1.default.findAll();
        if (books.length > 0) {
            res.status(200).json({ books });
        }
        else {
            res.status(404).send("No Books Found");
        }
    }
    catch (error) {
        res.status(500).json({ message: "server error", error: error });
    }
});
exports.getBooks = getBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_1.default.findByPk(req.params.id);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        else {
            res.status(200).json({ book });
        }
    }
    catch (error) {
        res.status(500).json({ message: "server error", error: error });
    }
});
exports.getBookById = getBookById;
const CreateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield books_1.default.create(req.body.book);
        res.status(201).send("Book created successfully");
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error occured while creating a book", error: error });
    }
});
exports.CreateBook = CreateBook;
const updateBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // update resolves to an array with two elements, the number of affected rows, the affected row
        let [affectedRows] = yield books_1.default.update(req.body.book, {
            where: { id: req.params.id },
        });
        if (affectedRows > 0) {
            res.status(200).send(`${affectedRows} books updated`);
        }
        else {
            res.status(404).send("Book not found");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error occurred while updating the book" });
    }
});
exports.updateBookById = updateBookById;
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // returns a promise that resolves to the number of affected rows.
        let affectedRows = yield books_1.default.destroy({
            where: { id: req.params.id },
        });
        if (affectedRows > 0) {
            res.status(200).send("Book is deleted");
        }
        else {
            res.status(404).send("No such book exists");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("internal server error");
    }
});
exports.deleteBookById = deleteBookById;
