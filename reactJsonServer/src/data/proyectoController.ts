import axios from "axios";
import { putProyectoList } from "../http/proyectoList.ts";
import { IProyecto } from "../types/IProyectos.ts";

const API_URL = "http://localhost:3000/proyectoList";

export const getProyectosController = async (): Promise<IProyecto[]> => {
  try {
    const response = await axios.get<{ proyectos: IProyecto[] }>(API_URL);
    return response.data.proyectos;
  } catch (error) {
    console.error("Error obteniendo los proyectos:", error);
    return [];
  }
};

export const getProyectosControllerPorId = async (
  idProyecto: string
): Promise<IProyecto | null> => {
  try {
    const proyectos: IProyecto[] = await getProyectosController();
    const proyecto = proyectos.find((proyect) => proyect.id === idProyecto);

    if (proyecto) {
      return proyecto;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error encontrando el proyecto:", error);
    return null;
  }
};

export const postProyectosController = async (
  proyectoNuevo: IProyecto
): Promise<IProyecto | null> => {
  try {
    const proyectos = await getProyectosController();
    await putProyectoList([...proyectos, proyectoNuevo]);
    return proyectoNuevo;
  } catch (error) {
    console.error("Error creando el proyectos:", error);
    return null;
  }
};

export const putProyectosController = async (
  proyectoEditado: IProyecto
): Promise<IProyecto | null> => {
  try {
    const proyectos = await getProyectosController();

    const result = proyectos.map((proyect) =>
      proyect.id === proyectoEditado.id
        ? { ...proyect, ...proyectoEditado }
        : proyect
    );

    await putProyectoList(result);

    return proyectoEditado;
  } catch (error) {
    console.error("Error creando el proyectos:", error);
    return null;
  }
};

export const deleteProyectoController = async (
  idProyecto: string
): Promise<void | null> => {
  try {
    const proyectos = await getProyectosController();

    const proyectosEliminado = proyectos.filter(
      (proyect) => proyect.id !== idProyecto
    );

    await putProyectoList(proyectosEliminado);
  } catch (error) {
    console.error("Error elilinando el proyectos:", error);
    return null;
  }
};
