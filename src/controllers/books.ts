import Book from "../models/books";
import Rent from "../models/rents";
import { Request, Response } from "express";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    if (books.length > 0) {
      res.status(200).json({ books });
    } else {
      res.status(404).send("No Books Found");
    }
  } catch (error) {
    res.status(500).json({ message: "server error", error: error });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found");
    } else {
      res.status(200).json({ book });
    }
  } catch (error) {
    res.status(500).json({ message: "server error", error: error });
  }
};
export const CreateBook = async (req: Request, res: Response) => {
  try {
    await Book.create(req.body.book);
    res.status(201).send("Book created successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occured while creating a book", error: error });
  }
};

export const updateBookById = async (req: Request, res: Response) => {
  try {
    // update resolves to an array with two elements, the number of affected rows, the affected row
    let [affectedRows] = await Book.update(req.body.book, {
      where: { id: req.params.id },
    });
    if (affectedRows > 0) {
      res.status(200).send(`${affectedRows} books updated`);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while updating the book" });
  }
};

export const deleteBookById = async (req: Request, res: Response) => {
  try {
    // returns a promise that resolves to the number of affected rows.
    let affectedRows: number = await Book.destroy({
      where: { id: req.params.id },
    });
    if (affectedRows > 0) {
      res.status(200).send("Book is deleted");
    } else {
      res.status(404).send("No such book exists");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
};
