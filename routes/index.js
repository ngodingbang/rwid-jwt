import authRouter from "./auth.js";
import userRouter from "./user.js";
import express from "express";

const router = express.Router();

router.use("/", authRouter);
router.use("/", userRouter);

export default router;
