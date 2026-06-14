import express from "express";
import {
  getAnalista,
  getManyAnalistas,
} from "../controllers/analistasController";

const router = express.Router();

router.get("/", getManyAnalistas);
router.get("/:id", getAnalista);

export default router;
