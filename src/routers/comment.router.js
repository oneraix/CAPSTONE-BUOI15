import express from "express";
import protect from "../common/middlewares/protect.middleware";
import commentController from "../controllers/comment.controller";


const commentRouter = express.Router();

commentRouter.get('/:imageId', commentController.getComments);
commentRouter.post('/:imageId', protect, commentController.postComment);

export default commentRouter