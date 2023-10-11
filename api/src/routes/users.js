import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/usersController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("You are logged in");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("Hello user, you are logged in and you can delete your account");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("Hello admin, you are logged in and you can delete all accounts");
});

router.route("/").get(verifyAdmin,getUsers);

router.route("/:id")
.get(verifyUser,getUserById)
.put(verifyUser,updateUser)
.delete(verifyUser,deleteUser);

export default router;
