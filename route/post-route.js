import { Router } from "express";
import { createPost, deletePost, getAllPost, getSinglePost } from "../controller/post-controller.js";
import { verifyToken } from "../middleware/jwtVerification.js";

const router = Router()

router.use(verifyToken)
router.get('', getAllPost)
router.get('/single-post/:id?', getSinglePost)
router.post('/create', createPost),
router.delete('/:id?', deletePost)

export default router