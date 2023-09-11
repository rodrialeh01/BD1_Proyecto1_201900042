import { Router } from "express";
import { cargarbtemp, cargarmodelo, eliminarmodelo, getInicio } from "../controllers/data.controllers.js";

const router = Router();

router.get('/', getInicio);
router.get('/cargartabtemp', cargarbtemp);
router.get('/cargarmodelo', cargarmodelo);
router.delete('/eliminarmodelo', eliminarmodelo);

export default router;