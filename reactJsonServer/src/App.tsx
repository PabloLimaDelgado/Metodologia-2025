import {
  deleteProyecto,
  getAllProyectos,
  getAllProyectosporId,
  postProyecto,
  putProyecto,
} from "./http/proyecto";
import { IProyecto } from "./types/IProyectos";
import "./app.css";
import { useState } from "react";

const proyectoAlpha: IProyecto = {
  id: "a4",
  nombre: "Proyecto Beta",
  descripcion: "Este es un proyecto de ejemplo para el curso.",
  fechaInicio: "2025-01-01",
  fechaFin: "2025-06-30",
  miembros: [
    {
      id: "m1",
      nombre: "Juan Pérez",
      rol: "Desarrollador",
    },
    {
      id: "m2",
      nombre: "Ana Gómez",
      rol: "Diseñadora",
    },
  ],
};

const proyectoAlphaEditado: IProyecto = {
  id: "a4",
  nombre: "Proyecto Beta editado",
  descripcion: "Este es un proyecto de ejemplo para el curso.",
  fechaInicio: "2025-01-01",
  fechaFin: "2025-06-30",
  miembros: [
    {
      id: "m1",
      nombre: "Juan Pérez",
      rol: "Desarrollador",
    },
    {
      id: "m2",
      nombre: "Ana Gómez",
      rol: "Diseñadora",
    },
  ],
};

const proyectos: IProyecto[] = await getAllProyectos();

function App() {
  const [proyecto, setProyecto] = useState<IProyecto[]>(proyectos);

  const agregarProyecto = async (proyecto: IProyecto) => {
    await postProyecto(proyecto);
    setProyecto(await getAllProyectos());
  };

  const modificarProyecto = async (proyecto: IProyecto) => {
    await putProyecto(proyecto);
    setProyecto(await getAllProyectos());
  };

  const eliminarProyecto = async (idProyecto: string) => {
    await deleteProyecto(idProyecto);
    setProyecto(await getAllProyectos());
  };

  return (
    <>
      <div className="divContainer">
        <h1>Proyectos</h1>
        <ul>
          {proyecto.map((proyectos) => (
            <>
              <li>
                <b>Nombre: </b> {proyectos.nombre}
              </li>
              <li>
                <b>Descripcion: </b> {proyectos.descripcion}
              </li>
            </>
          ))}
        </ul>
        <div>
          <button onClick={() => agregarProyecto(proyectoAlpha)}>
            Agregar Proyecto
          </button>
          <button onClick={() => modificarProyecto(proyectoAlphaEditado)}>
            Modificar Proyecto
          </button>
          <button onClick={() => eliminarProyecto("a4")}>
            Eliminar proyecto
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
