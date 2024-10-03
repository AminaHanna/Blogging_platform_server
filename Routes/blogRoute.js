import { Router } from "express";
import { createBlog, createUserBlog, deleteBlogById, getBlogById, getBlogs, getBlogsByCategory, getBlogsByUser, getDrafts, searchBlog, updateBlogById } from "../controllers/blogController.js";
import { verifyUserToken } from "../middleware/UserTokenVerify.js";
import { adminVerifyToken } from "../middleware/AdminTokenVerify.js";

const router = Router();

// router.post('/', createBlog);
router.get('/get-all-blogs', getBlogs);
router.get('/drafts', verifyUserToken, getDrafts);
router.get('/', verifyUserToken, getBlogsByUser);
router.post('/', verifyUserToken, createUserBlog);
router.get('/getblog-bycat/:id', getBlogsByCategory);
router.get('/search', searchBlog);
router.get('/:id', getBlogById);
router.put('/:id', updateBlogById);
router.delete('/:id', deleteBlogById);
// router.get('/user/:id', getBlogByUserId);
// router.get('/get-blog-admin', adminVerifyToken, getBlogsByAdmin);
// router.post('/', adminVerifyToken, createAdminBlog);

export default router;