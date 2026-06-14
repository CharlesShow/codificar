import type { Request, Response } from "express";
import { prisma } from "../../db/prisma";

const prioridadeChamadosRepository = prisma.prioridadeChamados;

async function getManyPrioridadeChamados(req: Request, res: Response) {
  const prioridadeChamados = await prioridadeChamadosRepository.findMany({
    take: 3,
  });
  if (prioridadeChamados.length > 0) res.json(prioridadeChamados);
  else res.sendStatus(404);
}

export { getManyPrioridadeChamados };
