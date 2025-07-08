import { responseSuccess } from "../common/helpers/response.helper";
import authService from "../services/auth.service";

const authController = {
    register:async(req, res)=>{
        const result = await authService.register(req);
        const resData = responseSuccess(result);
        res.status(resData.statusCode).json(resData);
    },
    login:async(req, res)=>{
        const result = await authService.login(req);
        const resData = responseSuccess(result);
        res.status(resData.statusCode).json(resData);
    },
    refreshToken: async (req, res) => {
      const result = await authService.refreshToken(req);
      const resData = responseSuccess(result);
      res.status(resData.statusCode).json(resData);
   },
}

export default authController