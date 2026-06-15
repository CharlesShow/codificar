import { useEffect, useMemo, useState } from "react";
import {
  createChamado,
  deleteChamado,
  getAnalistas,
  getChamados,
  getPrioridades,
  getStatus,
  updateChamado,
} from "./api";
import type {
  Analista,
  Chamado,
  ChamadoFormData,
  PrioridadeChamados,
  StatusChamados,
} from "./types";
import ChamadosForm from "./components/ChamadosForm";
import ChamadosTable from "./components/ChamadosTable";
// @ts-ignore
import styles from "./App.module.css";

const initialFormState: ChamadoFormData = {
  titulo: "",
  descricao: "",
  idAnalista: 0,
  idPrioridade: 0,
  idStatus: 0,
};

function App() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [analistas, setAnalistas] = useState<Analista[]>([]);
  const [prioridades, setPrioridades] = useState<PrioridadeChamados[]>([]);
  const [statusList, setStatusList] = useState<StatusChamados[]>([]);
  const [formData, setFormData] = useState<ChamadoFormData>(initialFormState);
  const [editingChamado, setEditingChamado] = useState<Chamado | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<number>(0);
  const [prioridadeFilter, setPrioridadeFilter] = useState<number>(0);

  const analistaCounts = useMemo(() => {
    const counts = new Map<number, number>();
    analistas.forEach((analista) => counts.set(analista.id, 0));
    chamados.forEach((chamado) => {
      counts.set(chamado.idAnalista, (counts.get(chamado.idAnalista) ?? 0) + 1);
    });
    return counts;
  }, [analistas, chamados]);

  function handleAutoAssign() {
    if (analistas.length === 0) return;

    let lowestAnalistaId = analistas[0].id;
    let lowestCount = analistaCounts.get(lowestAnalistaId) ?? 0;

    analistas.forEach((analista) => {
      const count = analistaCounts.get(analista.id) ?? 0;
      if (count < lowestCount) {
        lowestCount = count;
        lowestAnalistaId = analista.id;
      }
    });

    setFormData((current) => ({ ...current, idAnalista: lowestAnalistaId }));
  }

  const filteredChamados = useMemo(
    () =>
      chamados.filter((chamado) => {
        if (statusFilter && chamado.idStatus !== statusFilter) {
          return false;
        }
        if (prioridadeFilter && chamado.idPrioridade !== prioridadeFilter) {
          return false;
        }
        return true;
      }),
    [chamados, statusFilter, prioridadeFilter],
  );

  const analistaMap = useMemo(
    () => new Map(analistas.map((item) => [item.id, item.nome])),
    [analistas],
  );

  const prioridadeMap = useMemo(
    () => new Map(prioridades.map((item) => [item.id, item.descricao])),
    [prioridades],
  );

  const statusMap = useMemo(
    () => new Map(statusList.map((item) => [item.id, item.descricao])),
    [statusList],
  );

  async function loadData() {
    setLoading(true);
    setErrorMessage(null);

    try {
      const [
        chamadosResponse,
        analistasResponse,
        prioridadesResponse,
        statusResponse,
      ] = await Promise.all([
        getChamados(),
        getAnalistas(),
        getPrioridades(),
        getStatus(),
      ]);

      setChamados(chamadosResponse);
      setAnalistas(analistasResponse);
      setPrioridades(prioridadesResponse);
      setStatusList(statusResponse);
    } catch (error) {
      setErrorMessage(
        "Não foi possível carregar os dados. Verifique o servidor.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function resetForm() {
    setEditingChamado(null);
    setFormData(initialFormState);
  }

  async function handleCreate(form: ChamadoFormData) {
    try {
      const newChamado = await createChamado(form);
      setChamados((current) => [newChamado, ...current]);
      resetForm();
    } catch (error) {
      setErrorMessage("Falha ao criar chamado.");
    }
  }

  async function handleUpdate(form: ChamadoFormData) {
    if (!editingChamado) return;

    try {
      const updatedChamado = await updateChamado(editingChamado.id, form);
      setChamados((current) =>
        current.map((item) =>
          item.id === updatedChamado.id ? updatedChamado : item,
        ),
      );
      resetForm();
    } catch (error) {
      setErrorMessage("Falha ao atualizar chamado.");
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Deseja excluir este chamado?")) {
      return;
    }

    try {
      await deleteChamado(id);
      setChamados((current) => current.filter((item) => item.id !== id));
    } catch (error) {
      setErrorMessage("Falha ao excluir chamado.");
    }
  }

  function handleEdit(chamado: Chamado) {
    setEditingChamado(chamado);
    setFormData({
      titulo: chamado.titulo,
      descricao: chamado.descricao,
      idAnalista: chamado.idAnalista,
      idPrioridade: chamado.idPrioridade,
      idStatus: chamado.idStatus,
    });
  }

  const formTitle = useMemo(
    () =>
      editingChamado ? `Editando chamado ${editingChamado.id}` : "Novo chamado",
    [editingChamado],
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>CRUD de Chamados</h1>
          <p className={styles.description}>
            Gerencie os chamados do seu sistema. Crie, edite ou exclua chamados
            diretamente do front-end.
          </p>
        </div>
        <div className={styles.buttonsRow}>
          <button className={styles.refreshButton} onClick={loadData}>
            Atualizar
          </button>
        </div>
      </header>

      {errorMessage ? (
        <div className={styles.errorTray}>{errorMessage}</div>
      ) : null}

      <div className={styles.grid}>
        <section className={styles.card}>
          <h2>{formTitle}</h2>
          <ChamadosForm
            onSubmit={editingChamado ? handleUpdate : handleCreate}
            onCancel={resetForm}
            onAutoAssign={handleAutoAssign}
            submitLabel={editingChamado ? "Salvar alterações" : "Criar chamado"}
            formData={formData}
            setFormData={setFormData}
            analistas={analistas}
            prioridades={prioridades}
            statusList={statusList}
            errorMessage={errorMessage}
          />
        </section>

        <section className={styles.card}>
          <div className={styles.header}>
            <h2>Chamados recentes</h2>
          </div>

          <div className={styles.filterRow}>
            <div className={styles.filterItem}>
              <label>Status</label>
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(Number(event.target.value))
                }
              >
                <option value={0}>Todos</option>
                {statusList.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.descricao}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.filterItem}>
              <label>Prioridade</label>
              <select
                value={prioridadeFilter}
                onChange={(event) =>
                  setPrioridadeFilter(Number(event.target.value))
                }
              >
                <option value={0}>Todos</option>
                {prioridades.map((prioridade) => (
                  <option key={prioridade.id} value={prioridade.id}>
                    {prioridade.descricao}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => {
                setStatusFilter(0);
                setPrioridadeFilter(0);
              }}
            >
              Limpar filtros
            </button>
          </div>

          {loading ? <div>Carregando chamados...</div> : null}
          <ChamadosTable
            chamados={filteredChamados}
            onEdit={handleEdit}
            onDelete={handleDelete}
            analistaMap={analistaMap}
            prioridadeMap={prioridadeMap}
            statusMap={statusMap}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
