import { IEstudiante } from "./IEstudiante";

export interface ICurso {
  id: string;
  nombre: string;
  estudiantes: IEstudiante[];
}
