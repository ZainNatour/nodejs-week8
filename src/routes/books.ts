import express from "express";
import * as booksController from "../controllers/books";
const booksRouter = express.Router();

// books routes

booksRouter.get("/", booksController.getBooks);
booksRouter.get("/:id", booksController.getBookById);
booksRouter.post("/", booksController.CreateBook);
booksRouter.put("/:id", booksController.updateBookById);
booksRouter.delete("/:id", booksController.deleteBookById);

export default booksRouter;
