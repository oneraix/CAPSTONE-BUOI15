import express from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import imageRouter from "./image.router";
import commentRouter from "./comment.router";


const rootRouter = express.Router();
rootRouter.use("/auth", authRouter);
rootRouter.use("/user",userRouter);
rootRouter.use("/image",imageRouter);
rootRouter.use("/comment", commentRouter);
export default rootRouter