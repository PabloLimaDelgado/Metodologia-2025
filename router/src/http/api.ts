import axios from "axios";
import { ICurso } from "../types/ICurso";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllCursos = async () => {
  try {
    const response = await axios.get<ICurso[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    throw error;
  }
};

export const getCursoById = async (idCurso: string) => {
  try {
    const response = await axios.get<ICurso>(`${API_URL}/${idCurso}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el curso:", error);
    throw error;
  }
};
