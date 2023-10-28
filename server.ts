import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { sequelize } from "./src/database/sequelize";
import connection from "./src/database/database";
// import users, books router
import usersRouter from "./src/routes/users";
import booksRouter from "./src/routes/books";
import rentsRouter from "./src/routes/rents";
import passport from "./src/middlewares/login";
import authenticate from "./src/middlewares/authentication";

// connecting to database
connection.connect((error) => {
  if (error) {
    console.log("Failed to connect to database");
    return;
  } else {
    console.log(
      `Successfully connected to the database, threadId: ${connection.threadId}`
    );
  }
});
// syncing sequelize models
sequelize.sync({ force: false }).then(() => {
  console.log("Database and tables created sucessfully");
});

// port number
const port: number = Number(process.env.PORT) | 3000;

// initilizing express and parsing middlewares.
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/", (req: Request, res: Response) => {
//   res.redirect("/login");
// });
// import signup controller
import { signup } from "./src/controllers/users";
app.post("/signup", signup);
app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req: Request, res: Response) => {
    if (req.user) {
      res.json({ message: "logged in", token: req.token });
    } else {
      // Authentication failed
      res.status(401).json({ message: "Authentication failed" });
    }
  }
);

app.use(authenticate);
app.use("/rent", rentsRouter);
// app.use("/user", usersRouter);
app.use("/books", booksRouter);
app.use("/rent", rentsRouter);

app.listen(port, "localhost", () => {
  console.log(`server is running on port ${port}`);
});
