import { UserController } from "../controllers/UserController.js";
import { AuthService } from "../services/AuthService.js";
import express from "express";

const router = express.Router();

router.get("/users", AuthService.jwtMiddleware(), UserController.index);
router.get(
  "/users/:username",
  AuthService.jwtMiddleware(),
  UserController.show,
);

export default router;
