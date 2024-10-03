import { Router } from "express"; 
import { getUser, getUsers, signIn, signUp, updateUserProfile } from "../controllers/userController.js";
import { verifyUserToken } from "../middleware/UserTokenVerify.js";

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/', verifyUserToken, getUsers);
router.get('/profile', verifyUserToken, getUser);
router.put('/profile', verifyUserToken, updateUserProfile);

export default router;