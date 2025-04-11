import { IMiembro } from "./IMiembro.ts";

export interface IProyecto {
  id: string;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  miembros: IMiembro[];
}
