import React, { FC } from "react";
import { ICurso } from "../../../types/ICurso";
import styles from "./CardCurso.module.css";
import { useNavigate } from "react-router";

interface ICardCurso {
  curso: ICurso;
}

export const CardCurso: FC<ICardCurso> = ({ curso }) => {
  const navigate = useNavigate();

  const handleVerCurso = () => {
    navigate(`/estudiantes?curso=${curso.id}`);
  };

  return (
    <>
      <div className={styles.divContainerCard}>
        <h2>{curso.nombre}</h2>
        <p>Cantidad de alumnos: {curso.estudiantes.length}</p>
        <button onClick={handleVerCurso}>Ver Curso</button>
      </div>
    </>
  );
};
