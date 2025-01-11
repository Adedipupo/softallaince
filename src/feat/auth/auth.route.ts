import express from 'express';
import AuthController from './auth.controller';


const router = express.Router()

const authController = new AuthController()

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/resend-auth-code", authController.resendAuthCode);

export default router;
