import { Router } from "express";
import { createTag, deleteTagById, getTag, getTagById, updateTagById } from "../controllers/tagController.js";
import { adminVerifyToken } from "../middleware/AdminTokenVerify.js";

const router = Router();

router.post('/', adminVerifyToken,createTag);
router.get('/', getTag);
router.get('/:id', getTagById);
router.put('/:id',adminVerifyToken, updateTagById);
router.delete('/:id',adminVerifyToken, deleteTagById);

export default router;