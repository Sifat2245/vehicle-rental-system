import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router()

router.post('/signup', authController.userSignup)
router.post('/signin', authController.userSignin)

export const authRoutes = router;