import axios from "axios";
import { IProyectosList } from "../types/IProyectosList.ts";
import { IProyecto } from "../types/IProyectos.ts";

const API_URL = "http://localhost:3000/proyectoList";

export const putProyectoList = async (
  proyectos: IProyecto[]
): Promise<IProyectosList | null> => {
  try {
    const response = await axios.put<IProyectosList>(API_URL, { proyectos });
    return response.data;
  } catch (error) {
    console.error("Error actualizando el proyecto en la base de datos:", error);
    return null;
  }
};
