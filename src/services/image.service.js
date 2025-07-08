import cloudinary from "../common/cloudinary/init.cloudinary";
import prisma from "../common/prisma/init.prisma";


const imageService = {
  uploadImage: async (req) => {
    const { title, description } = req.body;
    const file = req.file;
    const user = req.user;

    if (!file || !title) {
      throw new BadrequestException('Thiếu tiêu đề hoặc hình ảnh');
    }

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'images' },
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      ).end(file.buffer);
    });

    const newImage = await prisma.images.create({
      data: {
        title,
        description,
        image_url: uploadResult.secure_url,
        user_id: user.id,
      },
    });

    return {
      id: newImage.id,
      title: newImage.title,
      imageUrl: uploadResult.secure_url,
    };
  },

  getAllImage: async (req) => {
    let { page, pageSize, filters } = req.query;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 3;
    filters = JSON.parse(filters || `{}`);

    Object.entries(filters).forEach(([key, value], i, arr) => {
      console.log(key, value);
      if (value === '' || value === null || value === undefined) {
        delete filters[key];
      }
      if (typeof value === "string") {
        filters[key] = { contains: value };
      }
    });

    console.log("\n");
    console.log("Xử lý \t\t", filters);

    const where = {
      ...filters,
    };
    console.log("Mong muốn \t", where);
    console.log("\n");

    // (page - 1) * pageSize
    const skip = (page - 1) * pageSize;

    const images = await prisma.images.findMany({
      take: pageSize, // LIMIT
      skip: skip, // OFFSET,
      orderBy: {
        createdAt: "desc",
      },
      where: where,
    });

    const totalItem = await prisma.images.count({
      where: where,
    });
    const totalPage = Math.ceil(totalItem / pageSize);

    return {
      page: page, // Số trang
      pageSize: pageSize, // Một trang có bao nhiêu item
      totalItem: totalItem, // Tổng cộng có tất cả bao nhiêu item
      totalPage: totalPage, // Tổng cộng có bao nhiêu trang
      items: images,
    };

  },

  getSavedImages: async (userId) => {
    const saved = await prisma.saved_images.findMany({
      where: { user_id: userId },
      include: { images: true },
    });
    return saved.map(item => item.images);
  },

  getCreatedImages: async (userId) => {
    return await prisma.images.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
  },

  deleteImage: async (imageId, userId) => {
    const image = await prisma.images.findUnique({ where: { id: +imageId } });

    if (!image) throw new NotFoundException('Ảnh không tồn tại');
    if (image.user_id !== userId) throw new ForbiddenException('Bạn không có quyền xóa ảnh này');

    await prisma.images.delete({ where: { id: +imageId } });
    return { id: imageId };
  },

  saveImage: async (userId, imageId) => {
    // kiểm tra xem ảnh đã tồn tại chưa
    const existed = await prisma.saved_images.findFirst({
      where: {
        user_id: userId,
        image_id: +imageId
      }
    });

    if (existed) {
      throw new BadrequestException('Ảnh này đã được lưu rồi');
    }

    const saved = await prisma.saved_images.create({
      data: {
        user_id: userId,
        image_id: +imageId,
      }
    });

    return saved;
  },

  getImageDetail: async (imageId) => {
    const image = await prisma.images.findUnique({
      where: { id: +imageId },
      include: {
        users: {
          select: { id: true, name: true, avatar: true }
        }
      }
    });
    return image;
  },

  checkSaved: async (userId, imageId) => {
    const saved = await prisma.saved_images.findFirst({
      where: {
        user_id: userId,
        image_id: +imageId
      }
    });
    return { isSaved: !!saved };
  }



}

export default imageService