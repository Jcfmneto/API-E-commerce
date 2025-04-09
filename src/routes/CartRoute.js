import { Router } from 'express';
import CartController from '../controller/CartController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/cart', authMiddleware, CartController.addToCart);

export default router;
