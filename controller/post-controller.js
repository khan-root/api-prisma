import prisma from "../DB/db.config.js"
import { findPostByID } from "../services/__findPostServices.js"
import { CustomErrorHandler } from "../services/customErrorHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { postSchema } from "../validator/postValidator.js"




export const getAllPost = asyncHandler(async(req, res)=>{
    const id = req.user.id
    const allPost = await prisma.post.findMany({
        where:{
            authorId: id
        }
    })
    return res.status(200).json(
        new ApiResponse(allPost)
    )
})


export const createPost = asyncHandler(async(req, res, next)=>{
    
    const { error } = postSchema.validate(req.body)
    const authorId = req.user.id;

    if(error){
        return next(error)
    }
    const { title, content, published} = req.body
    const newPost = await prisma.post.create({
        data:{
            authorId,
            title:title.trim(),
            content,
            published
        }
    })

    return res.status(201).json(
        new ApiResponse(newPost, "SUCCESSFUL", "Post Created Successfully")
    )

    
})




export const deletePost = asyncHandler(async(req, res, next)=>{
    const userId = req.user.id
    const {id} = req.params;

    console.log(req)

    if(!id){
        return next(CustomErrorHandler.badRequest("Id is Required"))
    }

    const findPost = await findPostByID(id)


    if(!findPost){
        return next(CustomErrorHandler.notFound("Post not found"))
    }
    if(findPost.authorId !== userId){
        return next(CustomErrorHandler.notFound("Post not found"))
    }


    const deletePost = await prisma.post.delete({
        where:{
            id: +id,
            authorId:userId
        }
    })
    if(deletePost){
        return res.status(202).json(
            new ApiResponse(null, "SUCCESSFUL", "Post successfully deleted")
        )
    }
})


export const getSinglePost = asyncHandler(async(req, res, next)=>{
    const { id } = req.params;
    const userId = req.user.id
    if(!id){
        return next(CustomErrorHandler.badRequest("Id is required"))
    }


    const findPost = await prisma.post.findFirst({
        where: {
            id: +id,
            authorId: userId,
        },
    });

    if (!findPost) {
        return next(CustomErrorHandler.notFound("Post not found"));
    }

    return res.status(200).json(
        new ApiResponse(findPost)
    )
})