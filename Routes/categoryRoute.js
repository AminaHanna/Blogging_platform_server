import { Router } from "express";
import { createCategory, deleteCategoryById, getCategory, getCategoryById, updateCategoryById } from "../controllers/categoriesController.js";
import { adminVerifyToken } from "../middleware/AdminTokenVerify.js";

const router = Router();

router.post('/', adminVerifyToken,createCategory);
router.get('/', getCategory);
router.get('/:id', getCategoryById);
router.put('/:id', adminVerifyToken,updateCategoryById);
router.delete('/:id', adminVerifyToken,deleteCategoryById);

export default router;