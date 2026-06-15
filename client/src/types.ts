export type Chamado = {
  id: number;
  titulo: string;
  descricao: string;
  idAnalista: number;
  idPrioridade: number;
  idStatus: number;
  dataCriado: string;
};

export type Analista = {
  id: number;
  nome: string;
};

export type PrioridadeChamados = {
  id: number;
  descricao: string;
};

export type StatusChamados = {
  id: number;
  descricao: string;
};

export type ChamadoFormData = {
  titulo: string;
  descricao: string;
  idAnalista: number;
  idPrioridade: number;
  idStatus: number;
};
