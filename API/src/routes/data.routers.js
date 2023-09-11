import { Router } from "express";
import { cargarbtemp, cargarmodelo, consulta1, consulta2, consulta3, consulta4, eliminarmodelo, getInicio } from "../controllers/data.controllers.js";

const router = Router();

router.get('/', getInicio);
router.get('/cargartabtemp', cargarbtemp);
router.get('/cargarmodelo', cargarmodelo);
router.delete('/eliminarmodelo', eliminarmodelo);
router.get('/consulta1', consulta1);
router.get('/consulta2', consulta2);
router.get('/consulta3', consulta3);
router.get('/consulta4', consulta4);

export default router;