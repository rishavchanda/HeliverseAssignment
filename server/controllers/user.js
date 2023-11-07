import User from "../models/User.js";
import { createError } from "../error.js";

export const getUsers = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = "",
      gender,
      domain,
      available,
    } = req.query;
    const perPage = parseInt(limit);
    const currentPage = parseInt(page);

    // Build a query for searching by user name
    const searchQuery = {};

    if (search) {
      searchQuery.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
      ];
    }

    if (gender && gender !== "all") {
      searchQuery.gender = gender;
    }
    if (domain && domain !== "all") {
      searchQuery.domain = domain;
    }
    if (available && available !== "all") {
      searchQuery.available = available;
    }

    const totalUsers = await User.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalUsers / perPage);

    if (totalPages > 0 && totalUsers > 0 && currentPage > totalPages) {
      return res.status(400).json({ message: "Page out of range" });
    }

    console.log(searchQuery);

    const users = await User.find(searchQuery)
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    return res.status(200).json({
      users,
      currentPage,
      totalPages,
      totalUsers,
    });
  } catch (err) {
    return next(createError(err.statusCode, err.message));
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    return res.status(200).json({ user });
  } catch (err) {
    return next(createError(err.statusCode, err.message));
  }
};

export const createUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    return res.status(201).json({ user: savedUser });
  } catch (err) {
    return next(createError(err.statusCode, err.message));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return next(createError(404, "User not found"));
    }
    return res.status(200).json({ user: updatedUser });
  } catch (err) {
    return next(createError(err.statusCode, err.message));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndRemove(id);
    if (!deletedUser) {
      return next(createError(404, "User not found"));
    }
    return res.status(204).send();
  } catch (err) {
    return next(createError(err.statusCode, err.message));
  }
};
