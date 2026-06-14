import type { Request, Response } from "express";
import { prisma } from "../../db/prisma";

const statusChamadosRepository = prisma.statusChamados;

async function getManyStatusChamados(req: Request, res: Response) {
  const statusChamados = await statusChamadosRepository.findMany({
    take: 3,
  });

  if (statusChamados.length > 0) res.json(statusChamados);
  else res.sendStatus(404);
}

export { getManyStatusChamados };
