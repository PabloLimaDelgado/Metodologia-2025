import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { tareaStore } from "../../../store/tareaStore";
import styles from "./modal.module.css";
import { ITarea } from "../../../types/ITareas";
import { useTareas } from "../../../hooks/useTareas";
import { editarTarea } from "../../../http/tareas";

type IModal = {
  handleCloseModal: VoidFunction;
};

const initialState: ITarea = {
  titulo: "",
  descripcion: "",
  fechaLimite: "",
};

export const Modal: FC<IModal> = ({ handleCloseModal }) => {
  const tareaActiva = tareaStore((state) => state.tareaActiva);
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const [formValues, setFormValue] = useState<ITarea>(initialState);

  const { createTarea, putEditarTarea } = useTareas();

  useEffect(() => {
    if (tareaActiva) {
      setFormValue(tareaActiva);
    } else {
      setFormValue(initialState);
    }
  }, [tareaActiva]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormValue((prev) => ({ ...prev, [`${name}`]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado", formValues);

    if (tareaActiva) {
      putEditarTarea(formValues);
    } else {
      createTarea({ ...formValues, id: new Date().toISOString() });
    }

    setTareaActiva(null);
    handleCloseModal();
  };

  return (
    <div className={styles.containerModal}>
      <div className={styles.contentPopUp}>
        <h3>{tareaActiva ? "Editar" : "Crear tarea"}</h3>
        <form onSubmit={handleSubmit} className={styles.formContent}>
          <div>
            <input
              type="text"
              required
              value={formValues.titulo}
              autoComplete="off"
              name="titulo"
              onChange={handleChange}
              placeholder="Ingrese un titulo"
            />
            <textarea
              required
              value={formValues.descripcion}
              name="descripcion"
              onChange={handleChange}
              placeholder="Ingrese una descripcion"
            />
            <input
              type="date"
              required
              value={formValues.fechaLimite}
              autoComplete="off"
              onChange={handleChange}
              name="fechaLimite"
            />
          </div>
          <div className={styles.buttonCard}>
            <button type="button" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button type="submit">
              {tareaActiva ? "Editar tarea" : "Crear tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
