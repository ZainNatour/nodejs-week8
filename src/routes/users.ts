import express from "express";
import * as usersController from "../controllers/users";
import passport from "../middlewares/login";
const usersRouter = express.Router();

usersRouter.post(
  "/login",
  //   specifying the stratigy i want to use :"local"
  passport.authenticate("local", { session: false }),
  usersController.login
);
usersRouter.post("/signup", usersController.signup);
usersRouter.post("/logout", usersController.logout);
usersRouter.put("/:id", usersController.updateUser);
usersRouter.delete("/:id", usersController.removeUser);

export default usersRouter;
