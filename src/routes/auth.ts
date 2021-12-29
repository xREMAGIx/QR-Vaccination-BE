import express from 'express'
import { protect } from '../middlewares/auth'
import { login, getMe, logout } from '../controllers/auth'

const router = express.Router();

router.post("/api/login", login);
router.post("/api/logout", protect, logout);
router.get("/api/me", protect, getMe);

export { router as authRouter }