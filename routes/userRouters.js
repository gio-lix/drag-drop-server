import express from "express";
import {auth, login, register} from "../controllers/userControllers.js";
import {registerValidation} from "../validation/authValidation.js";
import {checkAuth} from "../utils/checkAuth.js";

const router = express.Router()

router.post("/signup",registerValidation, register)
router.post("/login", login)
router.get("/auth/me",checkAuth, auth)


export default router