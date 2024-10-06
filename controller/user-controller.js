import prisma from "../DB/db.config.js"
import bcrypt from "bcrypt";
import { findUserByEmail, findUserByID } from "../services/__findUserService.js";
import { userSchema } from "../validator/userValidator.js";
import { CustomErrorHandler } from "../services/customErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; 

export const createUser = asyncHandler(async(req, res, next)=>{
    const {error} = userSchema.validate(req.body)
    if(error){
        return next(error)
    }
    const {name, email, password, role} = req.body
    const findUser = await findUserByEmail(email)
    if(findUser){
        return next(CustomErrorHandler.alreadyExist("User already exist"))
    }

    
    const newUser = await prisma.user.create({
        data:{
            name, 
            email, 
            password:bcrypt.hashSync(password, 10),
            role
        }
    })

    return res.status(201).json(
        new ApiResponse(newUser, "SUCCESSFUL")
    )
    
})


export const signin = asyncHandler(async(req, res, next)=>{
    const {email, password} = req.body
    const findUser = await findUserByEmail(email)
    if(!findUser){
        return next(CustomErrorHandler.notFound("User Not Found"))
    }
    const comparePassword = await bcrypt.compare(password, findUser.password)
    if(!comparePassword){
        return next(CustomErrorHandler.invalidCredentials("Invalid credentials"))
    }
     const token = jwt.sign(
    {
      id: findUser.id, // Include necessary user info in the payload
      email: findUser.email
    },
    JWT_SECRET, 
    { expiresIn: '1h' } // Token expiry time
  );


    // console.log('token', token)
    // return
    return res.status(200).json(
        new ApiResponse({...findUser, token}, "SUCCESSFUL", "Login Successfully")
    )
})


export const getSingleUser = asyncHandler(async(req, res, next)=>{
    const {id} = req.query
    if(!id){
        return next(CustomErrorHandler.badRequest("Id is Required"))
    }
    const findUser = await findUserByID(id)
    if(!findUser){
        return next(CustomErrorHandler.notFound("User Not Found"))
    }
    return res.status(201).json(
        new ApiResponse(findUser)
    )
})

export const deleteUser = asyncHandler(async(req, res, next)=>{
    const {id} = req.params;
    if(!id){
        return next(CustomErrorHandler.badRequest("Id is Required"))
    }
    const findUser = await findUserByID(id)
    if(!findUser){
        return next(CustomErrorHandler.notFound("User Not Found"))
    }
    const deleteUser = await prisma.user.delete({
        where:{
            id: +id
        }
    })
    if(deleteUser){
        return res.status(202).json(
            new ApiResponse(null, "SUCCESSFUL", "User successfully deleted")
        )
    }
})




export const getAllUser = asyncHandler(async(req, res)=>{
    const allUsers = await prisma.user.findMany()
    return res.status(200).json(
        new ApiResponse(allUsers)
    )
})