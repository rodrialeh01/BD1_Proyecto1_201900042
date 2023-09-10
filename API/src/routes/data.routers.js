import { Router } from "express";
import { cargarbtemp, getInicio } from "../controllers/data.controllers.js";

const router = Router();

router.get('/', getInicio);
router.get('/cargartabtemp', cargarbtemp);

export default router;