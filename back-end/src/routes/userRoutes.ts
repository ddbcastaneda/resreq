import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
} from "../controllers/userController";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser);

export default router;
