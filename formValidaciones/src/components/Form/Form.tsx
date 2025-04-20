import React, { useState } from "react";
import { Input } from "../Inputs/Inputs";
import { Button } from "../Button/Button";
import styles from "./form.module.css";
import { formSchema } from "../../shemas/formShema";
import Swal from "sweetalert2";

export const Form = () => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    name: "",
    email: "",
    contraseña: "",
    repetirContraseña: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = async (name: string, value: string) => {
    try {
      await formSchema.validateAt(name, { ...formValues, [name]: value });
      setErrors((prev) => {
        const { [name]: removed, ...rest } = prev;
        return rest;
      });
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formValues);
    
    try {
      await formSchema.validate(formValues, { abortEarly: false });

      Swal.fire({
        icon: "success",
        title: "Formulario enviado",
        text: "Se ha enviado correctamente",
        confirmButtonText: "Aceptar",
      });
      setErrors({});
      setFormValues({
        name: "",
        email: "",
        contraseña: "",
        repetirContraseña: "",
      });
    } catch (error: any) {
      const newErrors: { [key: string]: string } = {};
      error.inner.forEach((err: any) => {
        if (err.path) newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className={styles.formContainer}>
      <h1>Formulario de Manejo de Errores</h1>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          name="name"
          value={formValues.name}
          placeholder="Nombre"
          onChange={handleInputChange}
          error={errors.name}
        />
        <Input
          type="email"
          name="email"
          value={formValues.email}
          placeholder="Correo electrónico"
          onChange={handleInputChange}
          error={errors.email}
        />
        <Input
          type="password"
          name="contraseña"
          value={formValues.contraseña}
          placeholder="Contraseña"
          onChange={handleInputChange}
          error={errors.contraseña}
        />
        <Input
          type="password"
          name="repetirContraseña"
          value={formValues.repetirContraseña}
          placeholder="Repetir contraseña"
          onChange={handleInputChange}
          error={errors.repetirContraseña}
        />

        <Button
          type="submit"
          label="Enviar"
          onClick={() => {}}
          disabled={hasErrors}
        />
      </form>
    </div>
  );
};
