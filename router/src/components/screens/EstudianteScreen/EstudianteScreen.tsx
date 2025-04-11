import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { ICurso } from "../../../types/ICurso";
import { getCursoByIdController } from "../../../controllers/apiController";
import styles from "./estudianteScreen.module.css";
export const EstudianteScreen = () => {
  const [curso, setCurso] = useState<ICurso | null>(null);
  const [searchParams] = useSearchParams();
  const cursoId = searchParams.get("curso");

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        if (cursoId) {
          const data = await getCursoByIdController(cursoId);
          setCurso(data);
        }
      } catch (error) {
        throw error;
      }
    };

    fetchCurso();
  }, []);

  return (
    <>
      <div className={styles.divContainer}>
        <h1>{curso && curso.nombre}</h1>
        <div>
          {curso &&
            curso.estudiantes.map((estudiante) => (
              <>
                <div key={estudiante.id} className={styles.divContainerCard}>
                  <h3>{estudiante.nombre}</h3>
                  <p>{estudiante.edad}</p>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};
