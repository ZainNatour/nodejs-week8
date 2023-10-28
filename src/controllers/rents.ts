import Rent from "../models/rents";
import Book from "../models/books";
import { Request, Response } from "express";
import User from "../models/users";

export const rentBook = async (req: Request, res: Response) => {
  try {
    // Check if req.user is defined
    if (!req.user) {
      res.status(401).send("Not Authenticated");
      return;
    }

    // Now it's safe to access req.user.id using a type assertion
    const userId = (req.user as any).id; // Using 'any' as a type assertion
    console.log(
      userId + "++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );

    const bookId: number = parseInt(req.params.id);
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).send("No Such Book Found");
    }

    // Create the rent object
    const rent = Rent.build({
      notes: "notes",
      state: "rented",
      userId,
      bookId,
    });
    // Save the rent object to the database
    const savedRent = await rent.save();
    console.log("Book Is Saved");

    const rentedBook = await Rent.findByPk(savedRent.id, {
      include: [Book, User],
    });

    if (!rentedBook) {
      return res.status(404).send("No Such Rent Found");
    }

    return res.status(201).json(rentedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
