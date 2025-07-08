import prisma from "../common/prisma/init.prisma";

const commentService = {
        getComments: async (imageId) => {
  return await prisma.comments.findMany({
    where: { image_id: +imageId },
    orderBy: { created_at: 'desc' },
    include: {
      users: {
        select: { id: true, name: true, avatar: true }
      }
    }
  });
},

postComment: async (userId, imageId, content) => {
  return await prisma.comments.create({
    data: {
      content,
      image_id: +imageId,
      user_id: userId
    }
  });
}

}

export default commentService