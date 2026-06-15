import type { Request, Response } from "express";
import { prisma } from "../../db/prisma";
import PrioridadeChamados from "../enum/prioridadeChamados.enum";
import StatusChamados from "../enum/statusChamados.enum";

const chamadosRepository = prisma.chamados;

async function getChamados(req: Request, res: Response) {
  const chamado = await chamadosRepository.findFirst({
    where: { id: Number(req.params.id) },
  });

  if (chamado) res.json(chamado);
  else res.sendStatus(404);
}

async function getManyChamados(req: Request, res: Response) {
  const chamados = await chamadosRepository.findMany({
    take: 50,
  });

  res.json(chamados);
}

async function getManyChamadosBaixo(req: Request, res: Response) {
  const chamados = await chamadosRepository.findMany({
    take: 50,
    where: {
      idPrioridade: PrioridadeChamados.Baixa,
    },
  });

  res.json(chamados);
}

async function getManyChamadosMedia(req: Request, res: Response) {
  const chamados = await chamadosRepository.findMany({
    take: 50,
    where: {
      idPrioridade: PrioridadeChamados.Media,
    },
  });

  res.json(chamados);
}

async function getManyChamadosAlta(req: Request, res: Response) {
  const chamados = await chamadosRepository.findMany({
    take: 50,
    where: {
      idPrioridade: PrioridadeChamados.Alta,
    },
  });

  res.json(chamados);
}

async function postChamados(req: Request, res: Response) {
  const chamado = await chamadosRepository.create({
    data: req.body,
  });
  res.json(chamado);
}

async function patchChamados(req: Request, res: Response) {
  const idChamado = Number(req.params.id);
  const chamado = await chamadosRepository.update({
    data: req.body,
    where: { id: idChamado },
  });
  res.json(chamado);
}

async function deleteChamadados(req: Request, res: Response) {
  const idChamado = Number(req.params.id);
  const chamado = await chamadosRepository.delete({
    where: { id: idChamado },
  });
  res.json(chamado);
}

async function getManyChamadosAtendimento(req: Request, res: Response) {
  const chamados = await chamadosRepository.findMany({
    take: 50,
    where: {
      idStatus: StatusChamados.Atendimento,
    },
  });

  res.json(chamados);
}

async function getManyChamadosResolvido(req: Request, res: Response) {
  const chamados = await chamadosRepository.findMany({
    take: 50,
    where: {
      idStatus: StatusChamados.Resolvido,
    },
  });

  res.json(chamados);
}

async function getManyChamadosFechado(req: Request, res: Response) {
  const chamados = await chamadosRepository.findMany({
    take: 50,
    where: {
      idStatus: StatusChamados.Fechado,
    },
  });

  res.json(chamados);
}

export {
  getChamados,
  getManyChamadosBaixo,
  getManyChamados,
  getManyChamadosMedia,
  getManyChamadosAlta,
  patchChamados,
  deleteChamadados,
  postChamados,
  getManyChamadosAtendimento,
  getManyChamadosFechado,
  getManyChamadosResolvido,
};
