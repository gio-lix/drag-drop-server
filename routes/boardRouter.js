import express from "express";
import {
    create,
    deleteBoard,
    getAll,
    getFavorite,
    getOne,
    update,
    updateFavoritePosition
} from "../controllers/boardControllers.js";
import {checkAuth} from "../utils/checkAuth.js";
const router = express.Router()

router.post("/boards",checkAuth, create)

router.get("/boards/favorites",checkAuth, getFavorite)
router.put("/boards/favorites",checkAuth, updateFavoritePosition)

router.get("/boards",checkAuth, getAll)

router.get("/boards/:boardId",checkAuth, getOne)

router.put("/boards/:boardId",checkAuth, update)

router.delete("/boards/:boardId",checkAuth, deleteBoard)



export default router