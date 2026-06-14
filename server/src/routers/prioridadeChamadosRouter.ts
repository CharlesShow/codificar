import express from "express";
import { getManyPrioridadeChamados } from "../controllers/prioridadeChamadosController";

const router = express.Router();

router.get("/", getManyPrioridadeChamados);

export default router;
