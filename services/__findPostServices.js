import prisma from "../DB/db.config.js"

export const findPostByID = async(id)=>{
    const findPost = await prisma.post.findUnique({
        where:{
            id: +id
        }
    })


    return findPost
}