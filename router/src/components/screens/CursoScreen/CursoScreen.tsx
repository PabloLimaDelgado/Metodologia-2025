import { FC, useEffect, useState } from "react";
import { getAllCursosController } from "../../../controllers/apiController";
import { ICurso } from "../../../types/ICurso";
import { CardCurso } from "../../ui/CardCurso/CardCurso";
import styles from "./cursoScreen.module.css";

export const CursoScreen = () => {
  const [cursos, setCursos] = useState<ICurso[]>([]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const data = await getAllCursosController();
        setCursos(data);
      } catch (error) {
        console.error("Error al cargar cursos:", error);
      }
    };

    fetchCursos();
  }, []);
  return (
    <>
      <div className={styles.divContainer}>
        <h1>LISTADO DE CURSOS</h1>
        <div className={styles.divTareaContainer}>
          {cursos.map((curso) => (
            <CardCurso curso={curso} key={curso.id} />
          ))}
        </div>
      </div>
    </>
  );
};
