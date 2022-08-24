import express from "express";
import {checkAuth} from "../utils/checkAuth.js";
import {create, deleteSection, update} from "../controllers/sectionControllers.js";
const router  = express.Router({mergeParams: true})



router.post("/boards/:boardId/sections",checkAuth, create)
router.put("/boards/:boardId/sections/:sectionId",checkAuth, update)
router.delete("/boards/:boardId/sections/:sectionId",checkAuth, deleteSection)




export default router