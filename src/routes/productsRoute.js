import ProductsController from "../controller/ProductsController.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import isProductOwner from "../middleware/isProductOwner.js";

const router = Router();

router.get("/products", ProductsController.getProducts)
router.post("/products", authMiddleware, ProductsController.addProduct)
router.put("/products/:id", authMiddleware, isProductOwner, ProductsController.updateProduct)
router.delete("/products/:id", authMiddleware, isProductOwner, ProductsController.deleteProduct)

export default router;
