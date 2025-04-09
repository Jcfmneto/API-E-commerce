import { Router } from "express";
import PaymentController from "../controller/PaymentController.js";

const router = Router();

router.post('/checkout/:userId', PaymentController.createCheckoutSession);

export default router;
