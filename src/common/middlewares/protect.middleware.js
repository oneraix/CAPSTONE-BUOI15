import tokenService from "../../services/token.service";
import { UnauthorizedException } from "../helpers/exception.helper";
import prisma from "../prisma/init.prisma";

const protect = async (req,res,next)=> {
    req.isProtect = true;
    const authHeader = req.headers?.authorization ||"";
    const [type,token]= authHeader.split(" ");
    if(!token){
        throw new UnauthorizedException("Vui lòng đăng nhập");
    }
    if(type !== "Bearer"){
        throw new UnauthorizedException("Kiểu token không hợp lệ");
    }
    console.log({token});
    const decode = tokenService.verifyAccessToken(token)
    const user = await prisma.users.findUnique({
        where:{
            id: decode.id,
        },
    })
    req.user = user;
    next();
}

export default protect