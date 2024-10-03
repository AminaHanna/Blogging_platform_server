import { Router } from "express";
import { getAdmin, getAllAdmin, signIn, signUp, updateAdminProfile } from "../controllers/adminController.js";
import { adminVerifyToken } from "../middleware/AdminTokenVerify.js";

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', adminVerifyToken, getAdmin);
router.get('/', adminVerifyToken, getAllAdmin);
router.put('/profile', adminVerifyToken, updateAdminProfile);

export default router;