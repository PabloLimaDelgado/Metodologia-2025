import { useEffect, useState } from "react";
import { getAllTareas } from "../../http/tareas.ts";
import { Header } from "../ui/header/Header.tsx";
import { ListTareas } from "../ui/listTareas/ListTareas.tsx";

export const TareasScreen = () => {
  const getTareas = async () => {
    const result = await getAllTareas();
    console.log(result);
    return result;
  };

  useEffect(() => {
    getTareas();
  }, []);

  return (
    <div>
      <Header />
      <ListTareas />
    </div>
  );
};
