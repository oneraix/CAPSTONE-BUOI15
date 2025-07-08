import express from "express";
import authController from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post("/refresh-token",authController.refreshToken)
export default authRouter
