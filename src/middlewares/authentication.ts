import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Model } from "sequelize";
export default function authenticate(
  req: Request,
  res: Response,
  next: Function
) {
  const authHeader: string =
    req.header("Authorization") || req.header("authorization")!;
  if (!authHeader) return res.status(401).send("No Token Provided");
  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).send({ message: "Token is not valid" });
  }
}
