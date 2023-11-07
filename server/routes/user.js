import express from "express";
import * as UserController from "../controllers/user.js";

const router = express.Router();

// GET / - Get a list of users with optional searching and pagination
router.get("/", UserController.getUsers);

// GET /:id - Get a user by their ID
router.get("/:id", UserController.getUserById);

// POST / - Create a new user
router.post("/", UserController.createUser);

// PUT /:id - Update an existing user
router.put("/:id", UserController.updateUser);

// DELETE /:id - Delete a user by their ID
router.delete("/:id", UserController.deleteUser);

export default router;
