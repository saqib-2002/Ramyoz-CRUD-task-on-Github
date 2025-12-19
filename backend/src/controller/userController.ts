import { Request, Response } from "express";
import User from "../models/UserModel";

// Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const indianPhoneRegex = /^[6-9]\d{9}$/;

// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    console.log("BODY:", req.body);

    const { firstName, lastName, email, phone } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!indianPhoneRegex.test(phone.toString())) {
      return res.status(400).json({ message: "Invalid Indian phone number" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
    });

    res.status(201).json({ user, message: "User is created" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// get all user deatails
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// get user by Id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Invalid user ID" });
  }
};

// update User
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Update failed" });
  }
};

// dlt user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Delete failed" });
  }
};
