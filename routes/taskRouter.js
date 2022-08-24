import express from "express";
import {checkAuth} from "../utils/checkAuth.js";
import {create, taskDelete, update, updatePosition} from "../controllers/TaskControllers.js";

const router = express.Router()

router.post("/boards/:boardId/tasks", checkAuth, create)
router.put("/boards/:boardId/tasks/update-position", checkAuth, updatePosition)
router.delete("/boards/:boardId/tasks/:taskId", checkAuth, taskDelete)
router.put("/boards/:boardId/tasks/:taskId", checkAuth, update)


export default router