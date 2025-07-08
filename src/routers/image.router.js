import express from "express";
import protect from "../common/middlewares/protect.middleware";
import imageController from "../controllers/image.controller";
import uploadcloud from "../common/multer/cloud.multer";

const imageRouter = express.Router();

imageRouter.post("/upload-image", protect ,uploadcloud.single("image"), imageController.uploadImage);
imageRouter.get("/get-all-image", imageController.getAllImage)
imageRouter.post("/save/:id", protect, imageController.saveImage);
imageRouter.get("/saved", protect, imageController.getSavedImages);
imageRouter.get("/get-image-created", protect, imageController.getCreatedImages);
imageRouter.delete("/:id", protect, imageController.deleteImage);
imageRouter.get('/:id', imageController.getImageDetail);
imageRouter.get('/:id/saved', protect, imageController.checkSaved);



export default imageRouter