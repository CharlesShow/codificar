import type { Request, Response } from "express";
import { prisma } from "../../db/prisma";

const analistasRepository = prisma.analistas;

async function getAnalista(req: Request, res: Response) {
  const id = Number(req.params.id);

  const analista = await analistasRepository.findFirst({
    where: { id },
  });

  if (analista) {
    res.json(analista);
  } else res.sendStatus(404);
}

async function getManyAnalistas(req: Request, res: Response) {
  if (req.query.nome) {
    const analista = await analistasRepository.findFirst({
      where: { nome: req.query.nome as string },
    });
    if (analista) res.json(analista);
    else res.sendStatus(404);
  } else {
    const analistas = await analistasRepository.findMany({ take: 3 });
    if (analistas.length > 0) res.json(analistas);
    else res.sendStatus(404);
  }
}

export { getAnalista, getManyAnalistas };
