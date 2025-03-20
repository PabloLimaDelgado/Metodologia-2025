import { FC } from "react";
import { ITarea } from "../../../types/ITareas.ts";
import styles from "./cardList.module.css";
import { useTareas } from "../../../hooks/useTareas.ts";

type ICardList = {
  tarea: ITarea;
  handleOpenModal: (tarea: ITarea) => void;
};

export const CardList: FC<ICardList> = ({ tarea, handleOpenModal }) => {
  const {eliminarTarea} = useTareas()
  const eliminarTareaById = () => {
    eliminarTarea(tarea.id!)
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
        <button onClick={eliminarTareaById}>Eliminar</button>
      </div>
    </div>
  );
};
