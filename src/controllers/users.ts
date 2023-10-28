import User from "../models/users";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  // Use type assertions to inform TypeScript about the structure of req.user
  const { user, token } = req.user as any; // Use 'any' for type assertion

  // You can add additional user data you want to send in the response here
  const userData = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  res.status(200).json({
    user: userData,
    token,
  });
};

export const logout = async (req: Request, res: Response) => {};
export const signup = async (req: Request, res: Response) => {
  const { username, email, password, birthdate } = req.body;
  if (!username || !email || !password || !birthdate) {
    return res.status(400).send({ error: "Provide all the required fields." });
  }
  const exists = await User.findOne({ where: { email: email } });
  if (exists) {
    return res.status(400).send({ error: "Email already exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      birthdate,
    });
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error.");
  }
};
export const getUsers = async (req: Request, res: Response) => {
  res.send("get all users route");
};
export const getUserById = async (req: Request, res: Response) => {
  res.send("get user by id route");
};
export const updateUser = async (req: Request, res: Response) => {
  res.send("Update user route");
};
export const removeUser = async (req: Request, res: Response) => {
  res.send("Delete user route");
};
