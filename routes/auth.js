import { AuthController } from "../controllers/AuthController.js";
import express from "express";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/refresh-token", AuthController.refreshToken);

export default router;
