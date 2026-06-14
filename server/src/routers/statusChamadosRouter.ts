import express from "express";
import { getManyStatusChamados } from "../controllers/statusChamadosController";

const router = express.Router();

router.get("/", getManyStatusChamados);

export default router;
