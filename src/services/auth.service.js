import { BadrequestException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt"
import tokenService from "./token.service";

const authService = {
    register: async (req) => {
        const {email, password, name} = req.body;
        const userExists = await prisma.users.findUnique({
            where:{
                email: email
            },
        });
        console.log(userExists);
        if( userExists){
            throw new BadrequestException("Tài khoản đã tồn tại hãy đăng nhập")
        }
        const passwordHash = bcrypt.hashSync(password, 10);
        const newUser = await prisma.users.create({
            data:{
                email:email,
                password:passwordHash,
                name:name
            },
        });
        delete newUser.password;
        return newUser
    },

    login: async(req)=>{
        const{email, password}= req.body;
        const userExists = await prisma.users.findUnique({
            where:{
                email: email
            },
        });
        if(!userExists){
            throw new BadrequestException("Vui lòng đăng kí tài khoản");
        }
        const isPassword = bcrypt.compareSync(password, userExists.password);
        if(!isPassword){
            throw new BadrequestException("Mật khẩu không chính xác");
        }
        const tokens =tokenService.createToken(userExists.id);
        return tokens
    },
    refreshToken: async (req) => {
      const { accessToken, refreshToken } = req.body;

      const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken);
      const decodeAccessToken = tokenService.verifyAccessToken(accessToken, true);

      if (decodeRefreshToken.id !== decodeAccessToken.id) {
         throw new UnauthorizedException("Refresh Token không thành công");
      }
      const tokens = tokenService.createToken(decodeRefreshToken.id);

      return tokens;
   },
}

export default authService