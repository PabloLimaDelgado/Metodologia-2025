import { FC } from "react";
import { ITarea } from "../../../types/ITareas.ts";
import styles from "./cardList.module.css";
import { eliminarTarea } from "../../../http/tareas.ts";
import { useTareas } from "../../../hooks/useTareas.ts";

type ICardList = {
  tarea: ITarea;
  handleOpenModal: (tarea: ITarea) => void;
};

export const CardList: FC<ICardList> = ({ tarea, handleOpenModal }) => {
  const { deleteEliminarTarea } = useTareas();

  const eliminarTareaId = async () => {
    try {
      await deleteEliminarTarea(tarea.id!);
      console.log(`Tarea ${tarea.id} eliminada con éxito`);
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const editarTarea = () => {
    handleOpenModal(tarea);
  };

  return (
    <div className={styles.containerCard}>
      <div>
        <h3>Titulo: {tarea.titulo}</h3>
        <p>Descripcion: {tarea.descripcion}</p>
        <p>
          <b>Fecha Limite: {tarea.fechaLimite}</b>
        </p>
      </div>
      <div className={styles.actionCard}>
        <button onClick={editarTarea}>Editar</button>
        <button onClick={eliminarTareaId}>Eliminar</button>
      </div>
    </div>
  );
};
