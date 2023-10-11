import User from "../models/User.js";

// Get all Users
export const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Get user by ID
export const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Update User by ID
export const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const updatedUserData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedUserData,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Delete User by ID
export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndRemove(userId);
    res.status(204).send("Order has been deleted");
  } catch (err) {
    next(err);
  }
};
