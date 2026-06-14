import express from "express";
import {
  deleteChamadados,
  getChamados,
  getManyChamados,
  getManyChamadosAlta,
  getManyChamadosAtendimento,
  getManyChamadosBaixo,
  getManyChamadosFechado,
  getManyChamadosMedia,
  getManyChamadosResolvido,
  patchChamados,
  postChamados,
} from "../controllers/chamadosController";

const router = express.Router();

router.get("/", getManyChamados);
router.post("/", postChamados);
router.patch("/:id", patchChamados);
router.get("/:id", getChamados);
router.delete("/:id", deleteChamadados);
router.get("/prioridade/baixa", getManyChamadosBaixo);
router.get("/prioridade/media", getManyChamadosMedia);
router.get("/prioridade/alta", getManyChamadosAlta);
router.get("/status/atendimento", getManyChamadosAtendimento);
router.get("/status/resolvido", getManyChamadosResolvido);
router.get("/status/fechado", getManyChamadosFechado);

export default router;
