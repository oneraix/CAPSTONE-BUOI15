import { responseSuccess } from "../common/helpers/response.helper";
import imageService from "../services/image.service";


const imageController = {
    uploadImage:async (req, res)=>{
        const result = await imageService.uploadImage(req);
        const response = responseSuccess(result,"upload image successfully");
        res.status(response.statusCode).json(response);
    },

    getAllImage: async(req, res)=>{
        const result = await imageService.getallimage(req);
        const response = responseSuccess(result,"get all image successfully");
        res.status(response.statusCode).json(response);
    },

    getSavedImages: async (req, res) => {
        const result = await imageService.getSavedImages(req.user.id);
        const response = responseSuccess(result, 'Lấy ảnh đã lưu thành công');
     res.status(response.statusCode).json(response);
    },

    getCreatedImages: async (req, res) => {
        const result = await imageService.getCreatedImages(req.user.id);
        const response = responseSuccess(result, 'Lấy ảnh đã tạo thành công');
    res.status(response.statusCode).json(response);
    },

    deleteImage: async (req, res) => {
        const result = await imageService.deleteImage(req.params.id, req.user.id);
        const response = responseSuccess(result, 'Xóa ảnh thành công');
    res.status(response.statusCode).json(response);
    },

    saveImage: async (req, res) => {
  const result = await imageService.saveImage(req.user.id, req.params.id);
  const response = responseSuccess(result, 'Lưu ảnh thành công');
  res.status(response.statusCode).json(response);
},
getImageDetail: async (req, res) => {
  const result = await imageService.getImageDetail(req.params.id);
  const response = responseSuccess(result, 'Lấy chi tiết ảnh thành công');
  res.status(response.statusCode).json(response);
},

checkSaved: async (req, res) => {
  const result = await imageService.checkSaved(req.user.id, req.params.id);
  const response = responseSuccess(result, 'Kiểm tra ảnh đã lưu thành công');
  res.status(response.statusCode).json(response);
}


}

export default imageController