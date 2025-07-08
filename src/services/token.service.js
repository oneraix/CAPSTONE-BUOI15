import jwt from "jsonwebtoken";
import {ACCESS_TOKEN_EXPIRE, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRE, REFRESH_TOKEN_SECRET} from "../common/constant/app.constant.js";

const tokenService ={
    createToken:(id)=>{
        const accessToken = jwt.sign({id},ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRE});
        const refreshToken = jwt.sign({id},REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRE});
        return{
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
    },

    verifyAccessToken:(token,ignoreExpiration = false)=>{
        return jwt.verify(token,ACCESS_TOKEN_SECRET,{ignoreExpiration:ignoreExpiration})
    },

    verifyRefreshToken:(token)=>{
        return jwt.verify(token,REFRESH_TOKEN_SECRET)
    },

}

export default tokenService