import { Router } from "express";
import { createBlog, createUserBlog, deleteBlogById, getBlogById, getBlogByUserId, getBlogs, getBlogsByCategory, getBlogsOfUser, getBlogsandDraftsOfAllUser, getDrafts, getDraftsOfAllUser, getPublishedBlogsOfUser, searchBlog, updateBlogById } from "../controllers/blogController.js";
import { verifyUserToken } from "../middleware/UserTokenVerify.js";
import { adminVerifyToken } from "../middleware/AdminTokenVerify.js";

const router = Router();

// router.post('/', createBlog);
router.get('/get-all-blogs', getBlogs); 
router.get('/drafts', verifyUserToken, getDrafts);
router.get('/published', verifyUserToken, getPublishedBlogsOfUser);
router.get('/post-draft-users', getBlogsandDraftsOfAllUser);
router.get('/drafts-allusers', getDraftsOfAllUser);
router.get('/', verifyUserToken, getBlogsOfUser);
router.post('/', verifyUserToken, createUserBlog);
router.get('/getblog-bycat/:id', getBlogsByCategory);
router.get('/search', searchBlog);
router.get('/:id', getBlogById);
router.put('/:id', updateBlogById);
router.delete('/:id', deleteBlogById);
router.get('/user/:id', getBlogByUserId);

export default router;