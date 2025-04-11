import { getAllCursos, getCursoById } from "../http/api";
import { ICurso } from "../types/ICurso";

export const getAllCursosController = async (): Promise<ICurso[]> => {
  try {
    return await getAllCursos();
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    throw error;
  }
};

export const getCursoByIdController = async (
  idCurso: string
): Promise<ICurso> => {
  try {
    return await getCursoById(idCurso);
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    throw error;
  }
};
