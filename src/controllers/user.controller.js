import { responseSuccess } from "../common/helpers/response.helper";
import userService from "../services/user.service";

const userController ={
    updateInfo:async(req,res)=>{
        const result = await userService.updateInfo(req);
        const response = responseSuccess(result, "upload user info successfully");
        res.status(response.statusCode).json(response);
    },

    avatarCloud: async(req,res)=>{
        const result = await userService.avatarCloud(req);
        const response = responseSuccess(result,"upload avatar successfully");
        res.status(response.statusCode).json(response);
    },

    userInfo: async(req,res)=>{
        const result = await userService.userInfo(req);
        const response = responseSuccess(result,"get user info successfully");
        res.status(response.statusCode).json(response);
    }
}


export default userController