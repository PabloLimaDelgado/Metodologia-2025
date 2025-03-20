import { useEffect, useState } from "react";
import { tareaStore } from "../../../store/tareaStore.ts";
import styles from "./listTareas.module.css";
import { getAllTareas } from "../../../http/tareas.ts";
import { CardList } from "../cardList/CardList.tsx";
import { Modal } from "../modal/Modal.tsx";
import { ITarea } from "../../../types/ITareas.ts";
import { useTareas } from "../../../hooks/useTareas.ts";

export const ListTareas = () => {
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);

  const { getTareas, tareas } = useTareas();

  useEffect(() => {
    getTareas();
  }, []);

  const [openModalTarea, setOpenModalTarea] = useState(false);
  const handleOpenModal = (tarea: ITarea) => {
    setTareaActiva(tarea);
    setOpenModalTarea(true);
  };

  const handleCloseModal = () => {
    setOpenModalTarea(false);
  };
  return (
    <>
      <div className={styles.containerPrincipalList}>
        <div className={styles.containerTitleAndButton}>
          <h2>Lista de tareas</h2>
          <button
            onClick={() => {
              setOpenModalTarea(true);
            }}
          >
            Agregar Tarea
          </button>
        </div>
        <div className={styles.containerList}>
          {tareas.length > 0 ? (
            tareas.map((el) => (
              <CardList tarea={el} handleOpenModal={handleOpenModal} />
            ))
          ) : (
            <div>
              <h3>No hay tareas</h3>
            </div>
          )}
        </div>
      </div>

      {openModalTarea && <Modal handleCloseModal={handleCloseModal} />}
    </>
  );
};
