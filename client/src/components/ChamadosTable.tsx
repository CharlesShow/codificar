import type { Chamado } from "../types";
// @ts-ignore
import styles from "./ChamadosTable.module.css";

type Props = {
  chamados: Chamado[];
  onEdit: (chamado: Chamado) => void;
  onDelete: (id: number) => void;
  analistaMap: Map<number, string>;
  prioridadeMap: Map<number, string>;
  statusMap: Map<number, string>;
};

function ChamadosTable({
  chamados,
  onEdit,
  onDelete,
  analistaMap,
  prioridadeMap,
  statusMap,
}: Props) {
  if (chamados.length === 0) {
    return <div className={styles.empty}>Nenhum chamado disponível.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título / Descrição</th>
            <th>Analista</th>
            <th>Status</th>
            <th>Prioridade</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map((chamado) => (
            <tr key={chamado.id}>
              <td>{chamado.id}</td>
              <td>
                <div className={styles.titleCell}>{chamado.titulo}</div>
                <div className={styles.descriptionCell}>
                  {chamado.descricao}
                </div>
              </td>
              <td>
                {analistaMap.get(chamado.idAnalista) ?? chamado.idAnalista}
              </td>
              <td>{statusMap.get(chamado.idStatus) ?? chamado.idStatus}</td>
              <td>
                {prioridadeMap.get(chamado.idPrioridade) ??
                  chamado.idPrioridade}
              </td>
              <td>
                {new Date(chamado.dataCriado).toLocaleDateString("pt-BR")}
              </td>
              <td className={styles.actionsCell}>
                <button
                  className={styles.editButton}
                  onClick={() => onEdit(chamado)}
                >
                  Editar
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => onDelete(chamado.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChamadosTable;
