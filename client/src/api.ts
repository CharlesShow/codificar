import type {
  Analista,
  Chamado,
  ChamadoFormData,
  PrioridadeChamados,
  StatusChamados,
} from "./types";

const API_BASE = "/api";

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || response.statusText);
  }

  return response.json();
}

export function getChamados(): Promise<Chamado[]> {
  return fetchJson<Chamado[]>(`${API_BASE}/chamados`);
}

export function getAnalistas(): Promise<Analista[]> {
  return fetchJson<Analista[]>(`${API_BASE}/analistas`);
}

export function getPrioridades(): Promise<PrioridadeChamados[]> {
  return fetchJson<PrioridadeChamados[]>(`${API_BASE}/prioridade_chamados`);
}

export function getStatus(): Promise<StatusChamados[]> {
  return fetchJson<StatusChamados[]>(`${API_BASE}/status_chamados`);
}

export function createChamado(data: ChamadoFormData): Promise<Chamado> {
  return fetchJson<Chamado>(`${API_BASE}/chamados`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateChamado(
  id: number,
  data: ChamadoFormData,
): Promise<Chamado> {
  return fetchJson<Chamado>(`${API_BASE}/chamados/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteChamado(id: number): Promise<void> {
  return fetchJson<void>(`${API_BASE}/chamados/${id}`, {
    method: "DELETE",
  });
}
