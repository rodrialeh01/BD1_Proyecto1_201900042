import { Router } from "express";
import { cargarbtemp, cargarmodelo, consulta1, eliminarmodelo, getInicio } from "../controllers/data.controllers.js";

const router = Router();

router.get('/', getInicio);
router.get('/cargartabtemp', cargarbtemp);
router.get('/cargarmodelo', cargarmodelo);
router.delete('/eliminarmodelo', eliminarmodelo);
router.get('/consulta1', consulta1)

export default router;