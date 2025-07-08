import express from "express";
import userController from "../controllers/user.controller";
import uploadcloud from "../common/multer/cloud.multer";
import protect from "../common/middlewares/protect.middleware";


const userRouter = express.Router();

userRouter.put("/update-info",protect,userController.updateInfo);
userRouter.post("/avatar-cloud", protect, uploadcloud.single("avatar"), userController.avatarCloud);
userRouter.get("/user-info", protect, userController.userInfo)

export default userRouter