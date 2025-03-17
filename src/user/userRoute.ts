import User from "./userModel";
import { Request, Response } from "express";
import { User as UserClass } from "./userService";
import express from "express";
const userRoutes = express.Router();

userRoutes.post("/users",async (req: Request, res: Response): Promise<any> => {
  try {
    const { firstName, lastName, imageUrl } = req.body;

    if (!firstName || !lastName || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ where: { firstName, lastName } });

    if (existingUser) {
      return res.status(409).json({ message: "User with this name already exists" });
    }
    const newUser: any = new UserClass(firstName, lastName, imageUrl);
    const user: any = await User.create(newUser);

    return res.status(201).json({ message: "User account created", user });
  } catch (error: any) {
    console.error("Error during user registration:", error);
    return res.status(500).json({ message: "Failed while creating a user", error: error.message });
  }
});
export {userRoutes};
