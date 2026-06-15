import { useEffect } from "react";
import { z } from "zod";
import type {
  Analista,
  ChamadoFormData,
  PrioridadeChamados,
  StatusChamados,
} from "../types";
// @ts-ignore
import styles from "./ChamadosForm.module.css";

const chamadoSchema = z.object({
  titulo: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  descricao: z.string().min(5, "Descrição deve ter pelo menos 5 caracteres"),
  idAnalista: z.number().positive("Selecione o analista"),
  idPrioridade: z.number().positive("Selecione a prioridade"),
  idStatus: z.number().positive("Selecione o status"),
});

type Props = {
  onSubmit: (form: ChamadoFormData) => void;
  onCancel: () => void;
  onAutoAssign: () => void;
  submitLabel: string;
  formData: ChamadoFormData;
  setFormData: React.Dispatch<React.SetStateAction<ChamadoFormData>>;
  analistas: Analista[];
  prioridades: PrioridadeChamados[];
  statusList: StatusChamados[];
  errorMessage: string | null;
};

function ChamadosForm({
  onSubmit,
  onCancel,
  onAutoAssign,
  submitLabel,
  formData,
  setFormData,
  analistas,
  prioridades,
  statusList,
  errorMessage,
}: Props) {
  useEffect(() => {
    if (!formData.idAnalista && analistas.length > 0) {
      setFormData((current) => ({
        ...current,
        idAnalista: analistas[0].id,
      }));
    }
  }, [analistas, formData.idAnalista, setFormData]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = chamadoSchema.safeParse(formData);
    if (!parsed.success) {
      const firstError = Object.values(parsed.error.formErrors.fieldErrors)
        .flat()
        .find(Boolean);
      alert(firstError || "Dados inválidos");
      return;
    }

    onSubmit(parsed.data);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label>Título</label>
        <input
          type="text"
          value={formData.titulo}
          onChange={(event) =>
            setFormData({ ...formData, titulo: event.target.value })
          }
        />
      </div>

      <div className={styles.row}>
        <label>Descrição</label>
        <textarea
          rows={4}
          value={formData.descricao}
          onChange={(event) =>
            setFormData({ ...formData, descricao: event.target.value })
          }
        />
      </div>

      <div className={styles.inlineGroup}>
        <div className={styles.fieldBox}>
          <label>Analista</label>
          <select
            value={formData.idAnalista}
            onChange={(event) =>
              setFormData({
                ...formData,
                idAnalista: Number(event.target.value),
              })
            }
          >
            <option value={0}>Selecione</option>
            {analistas.map((analista) => (
              <option key={analista.id} value={analista.id}>
                {analista.nome}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldBox}>
          <label>Prioridade</label>
          <select
            value={formData.idPrioridade}
            onChange={(event) =>
              setFormData({
                ...formData,
                idPrioridade: Number(event.target.value),
              })
            }
          >
            <option value={0}>Selecione</option>
            {prioridades.map((prioridade) => (
              <option key={prioridade.id} value={prioridade.id}>
                {prioridade.descricao}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldBox}>
          <label>Status</label>
          <select
            value={formData.idStatus}
            onChange={(event) =>
              setFormData({
                ...formData,
                idStatus: Number(event.target.value),
              })
            }
          >
            <option value={0}>Selecione</option>
            {statusList.map((status) => (
              <option key={status.id} value={status.id}>
                {status.descricao}
              </option>
            ))}
          </select>
        </div>
      </div>

      {errorMessage ? <div className={styles.error}>{errorMessage}</div> : null}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onAutoAssign}
        >
          Atribuir automaticamente
        </button>
        <button type="submit" className={styles.primaryButton}>
          {submitLabel}
        </button>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default ChamadosForm;
