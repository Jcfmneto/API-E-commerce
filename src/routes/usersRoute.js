import { Router } from "express";
import UsersController from "../controller/usersController.js";    

const router = Router();

router.post("/register", UsersController.createUser); 
router.post("/login", UsersController.login);
router.post("/logout", UsersController.logout);

export default router;
