import { Router } from "express";
import { cargarbtemp, cargarmodelo, consulta1, consulta10, consulta11, consulta2, consulta3, consulta4, consulta5, consulta6, consulta7, consulta8, consulta9, eliminarmodelo, getInicio } from "../controllers/data.controllers.js";

const router = Router();

router.get('/', getInicio);
router.get('/cargartabtemp', cargarbtemp);
router.get('/cargarmodelo', cargarmodelo);
router.delete('/eliminarmodelo', eliminarmodelo);
router.get('/consulta1', consulta1);
router.get('/consulta2', consulta2);
router.get('/consulta3', consulta3);
router.get('/consulta4', consulta4);
router.get('/consulta5', consulta5);
router.get('/consulta6', consulta6);
router.get('/consulta7', consulta7);
router.get('/consulta8', consulta8);
router.get('/consulta9', consulta9);
router.get('/consulta10', consulta10);
router.get('/consulta11', consulta11);

export default router;