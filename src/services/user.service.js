import { error } from "console";
import cloudinary from "../common/cloudinary/init.cloudinary";
import { BadrequestException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import path from "path";
import fs from "fs";
import { data } from "react-router-dom";

const userService = {
   updateInfo: async (req) => {
      const { name = undefined, description = undefined, website = undefined } = req.body;
      const result = await prisma.users.updateMany({
         where: {
            id: req.user.id
         },
         data: {
            name: name,
            description: description,
            website: website
         },
      })
      return result
   },

   avatarCloud: async function (req) {
      console.log(req.file);

      const file = req.file;
      if (!file) {
         throw new BadrequestException("Chưa tìm thấy file");
      }

      // Configuration
      const user = req.user

      const uploadResult = await new Promise((resolve) => {
         cloudinary.uploader
            .upload_stream({ folder: "images" }, (error, uploadResult) => {
               return resolve(uploadResult);
            })
            .end(file.buffer);
      });
      console.log({ uploadResult });

      try {
         await prisma.users.update({
            where: {
               id: user.id
            },
            data: {
               avatar: uploadResult.public_id
            },
         })
         if (user.avatar) {
            const oldFilePath = path.join("images", user.avatar);
            if (fs.existsSync(oldFilePath)) {
               fs.unlinkSync(oldFilePath);
            }
            cloudinary.uploader.destroy(user.avatar)
         }
      } catch {
         console.log(error);
         throw new BadrequestException(error.message);

      }

      return {
         folder: uploadResult.asset_folder,
         filename: file.originalname,
         imgUrl: uploadResult.secure_url
      }
   },

   userInfo: async (req) => {
      const result = await prisma.users.findUnique({
         where: {
            id: req.user.id
         }
      })
      delete result.password;
      return result
   },


}

export default userService