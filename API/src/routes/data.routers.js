import { Router } from "express";
import { getInicio } from "../controllers/data.controllers.js";

const router = Router();

router.get('/', getInicio);

export default router;