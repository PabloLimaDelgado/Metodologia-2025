import { create } from "zustand";
import { ITarea } from "../types/ITareas.ts";

interface ITareaStore {
  tareas: ITarea[];
  tareaActiva: ITarea | null;
  setTareaActiva: (tareaActiva: ITarea | null) => void;
  setArrayTareas: (arrayDeTareas: ITarea[]) => void;
  agregarTarea: (nuevaTarea: ITarea) => void;
  editarTarea: (editarTarea: ITarea) => void;
  eliminarTarea: (idTarea: string) => void;
}

export const tareaStore = create<ITareaStore>((set) => ({
  tareas: [],
  tareaActiva: null,
  setTareaActiva: (tareaActivaIn) =>
    set(() => ({ tareaActiva: tareaActivaIn })),
  setArrayTareas: (arrayTareas) => set(() => ({ tareas: arrayTareas })),
  agregarTarea: (nuevaTarea) =>
    set((state) => ({ tareas: [...state.tareas, nuevaTarea] })),
  editarTarea: (tareaEditada) =>
    set((state) => {
      const arregloTareas = state.tareas.map((tarea) =>
        tarea.id === tareaEditada.id ? { ...tarea, tareaEditada } : tarea
      );
      return { tareas: arregloTareas };
    }),
  eliminarTarea: (idTarea) =>
    set((state) => {
      const arregloTareas = state.tareas.filter(
        (tarea) => tarea.id !== idTarea
      );
      return { tareas: arregloTareas };
    }),
}));
