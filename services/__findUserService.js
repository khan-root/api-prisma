import prisma from "../DB/db.config.js"

export const findUserByID = async(id)=>{
    const findUser = await prisma.user.findUnique({
        where:{
            id: +id 
        }
    })

    return findUser
}
export const findUserByEmail = async(email)=>{
    const findUser = await prisma.user.findUnique({
        where:{
            email: email
        }
    })

    return findUser
}