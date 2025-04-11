import {
  deleteProyectoController,
  getProyectosController,
  getProyectosControllerPorId,
  postProyectosController,
  putProyectosController,
} from "../data/proyectoController";
import { IProyecto } from "../types/IProyectos";

export const getAllProyectos = async (): Promise<IProyecto[]> => {
  try {
    return await getProyectosController();
  } catch (error) {
    console.log("Error al obtener los proyectos", error);
    return [];
  }
};

export const getAllProyectosporId = async (
  idProyecto: string
): Promise<IProyecto | null> => {
  try {
    return await getProyectosControllerPorId(idProyecto);
  } catch (error) {
    console.error("Error encontrando el proyectos:", error);
    return null;
  }
};

export const postProyecto = async (
  proyectoNuevo: IProyecto
): Promise<IProyecto | null> => {
  try {
    return await postProyectosController(proyectoNuevo);
  } catch (error) {
    console.error("Error creando el proyectos:", error);
    return null;
  }
};

export const putProyecto = async (
  proyectoEditado: IProyecto
): Promise<IProyecto | null> => {
  try {
    return await putProyectosController(proyectoEditado);
  } catch (error) {
    console.error("Error editando el proyectos:", error);
    return null;
  }
};

export const deleteProyecto = async (
  idProyecto: string
): Promise<void | null> => {
  try {
    return await deleteProyectoController(idProyecto);
  } catch (error) {
    console.error("Error elilinando el proyectos:", error);
    return null;
  }
};
