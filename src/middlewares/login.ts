// login.ts

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import jwt from "jsonwebtoken";
import User from "../models/users";
import bcrypt from "bcrypt";
// import dotenv from "dotenv";
// dotenv.config();
import { IUser } from "../utils/interfaces";

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (req: any, username: string, password: string, done: Function) => {
      try {
        const user = (await User.findOne({
          where: { username },
        })) as IUser | null;
        if (!user) {
          return done(null, false, {
            status: 401,
            message: "Incorrect username.",
          });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, {
            status: 401,
            message: "Incorrect password.",
          });
        }
        const token = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "1h",
          }
        );
        req.user = {
          user,
        };
        req.token = token;

        return done(null, user, { token });
      } catch (error) {
        return done(error, false, {
          status: 500,
          message: "Internal server error",
        });
      }
    }
  )
);

passport.serializeUser((user: any, done: Function) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done: Function) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
export default passport;
