import { Navigate, Route, Routes } from "react-router";
import { CursoScreen } from "../components/screens/CursoScreen/CursoScreen";
import { EstudianteScreen } from "../components/screens/EstudianteScreen/EstudianteScreen";

export const AppRputer = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cursos" replace />} />
      <Route path="/cursos" element={<CursoScreen />} />
      <Route path="/estudiantes" element={<EstudianteScreen />} />
    </Routes>
  );
};
