import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  email: Yup.string()
    .required("El correo es obligatorio")
    .email("Formato de correo inválido"),
  contraseña: Yup.string()
    .required("La contraseña es obligatoria")
    .min(6, "Debe tener al menos 6 caracteres"),
  repetirContraseña: Yup.string()
    .required("Debe repetir la contraseña")
    .oneOf([Yup.ref("contraseña")], "Las contraseñas no coinciden"),
});
