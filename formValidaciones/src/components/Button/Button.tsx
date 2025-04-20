import { FC } from "react";
import styles from "./button.module.css";

interface ButtonProps {
  onClick: () => void;
  label: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  label,
  type = "button",
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
    >
      {label}
    </button>
  );
};
