"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize_1 = require("./src/database/sequelize");
const database_1 = __importDefault(require("./src/database/database"));
const books_1 = __importDefault(require("./src/routes/books"));
const rents_1 = __importDefault(require("./src/routes/rents"));
const login_1 = __importDefault(require("./src/middlewares/login"));
const authentication_1 = __importDefault(require("./src/middlewares/authentication"));
// connecting to database
database_1.default.connect((error) => {
    if (error) {
        console.log("Failed to connect to database");
        return;
    }
    else {
        console.log(`Successfully connected to the database, threadId: ${database_1.default.threadId}`);
    }
});
// syncing sequelize models
sequelize_1.sequelize.sync({ force: false }).then(() => {
    console.log("Database and tables created sucessfully");
});
// port number
const port = Number(process.env.PORT) | 3000;
// initilizing express and parsing middlewares.
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// app.use("/", (req: Request, res: Response) => {
//   res.redirect("/login");
// });
// import signup controller
const users_1 = require("./src/controllers/users");
app.post("/signup", users_1.signup);
app.post("/login", login_1.default.authenticate("local", { session: false }), (req, res) => {
    if (req.user) {
        res.json({ message: "logged in", token: req.token });
    }
    else {
        // Authentication failed
        res.status(401).json({ message: "Authentication failed" });
    }
});
app.use(authentication_1.default);
app.use("/rent", rents_1.default);
// app.use("/user", usersRouter);
app.use("/books", books_1.default);
app.use("/rent", rents_1.default);
app.listen(port, "localhost", () => {
    console.log(`server is running on port ${port}`);
});
