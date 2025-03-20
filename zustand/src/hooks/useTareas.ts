import { useShallow } from "zustand/shallow";
import { tareaStore } from "../store/tareaStore.ts";
import {
  editarTarea,
  eliminarTarea,
  getAllTareas,
  postNuevaTarea,
} from "../http/tareas.ts";
import { ITarea } from "../types/ITareas.ts";
import Swal from "sweetalert2";

export const useTareas = () => {
  const { tareas, setArrayTareas, crearTarea, eliminarTarea, editarTarea } =
    tareaStore(
      useShallow((state) => ({
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas,
        crearTarea: state.agregarTarea,
        eliminarTarea: state.eliminarTarea,
        editarTarea: state.editarTarea,
      }))
    );

  const getTareas = async () => {
    const data = await getAllTareas();
    if (data) {
      setArrayTareas(data);
    }
  };

  const createTarea = async (nuevaTarea: ITarea) => {
    crearTarea(nuevaTarea);
    try {
      Swal.fire("Exito", "Tarea creada correctamente", "success");
      await postNuevaTarea(nuevaTarea);
    } catch (error) {
      eliminarTarea(nuevaTarea.id!);
    }
  };

  const putEditarTarea = async (tareaEditada: ITarea) => {
    const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id);

    editarTarea(tareaEditada);
    try {
      await editarTarea(tareaEditada);
      Swal.fire("Exito", "Tarea actualizada correctamente", "success");
    } catch (error) {
      if (estadoPrevio) editarTarea(estadoPrevio);
      console.log("algo salio mal");
    }
  };

  const deleteEliminarTarea = async (idTarea: string) => {
    const estadoPrevio = tareas.find((el) => el.id === idTarea);

    const confirm = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta accion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) return eliminarTarea(idTarea);
    try {
      await eliminarTarea(idTarea);
      Swal.fire("Eliminado", "La tarea se elimino correctamente", "success");
    } catch (error) {
      if (estadoPrevio) crearTarea(estadoPrevio);
      console.log("Algo salio mal al eliminar");
    }
  };

  return {
    getTareas,
    createTarea,
    putEditarTarea,
    deleteEliminarTarea,
    tareas
  };
};
