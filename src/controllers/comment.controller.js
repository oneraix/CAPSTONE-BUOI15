import express from "express";
import protect from "../common/middlewares/protect.middleware";
import commentService from "../services/comment.service";
import { responseSuccess } from "../common/helpers/response.helper";

const commentController = {
    getComments: async (req, res) => {
  const result = await commentService.getComments(req.params.imageId);
  const response = responseSuccess(result, 'Lấy bình luận thành công');
  res.status(response.statusCode).json(response);
},

postComment: async (req, res) => {
  const result = await commentService.postComment(req.user.id, req.params.imageId, req.body.content);
  const response = responseSuccess(result, 'Bình luận thành công');
  res.status(response.statusCode).json(response);
}

}


export default commentController