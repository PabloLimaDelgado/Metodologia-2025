import { ChangeEvent, FC } from "react";
import styles from "./inputs.module.css";

interface IInputProps {
  type: string;
  placeholder: string;
  name: string;
  onChange: (name: string, value: string) => void;
  value: string;
  error?: string;
}

export const Input: FC<IInputProps> = ({
  type,
  placeholder,
  name,
  onChange,
  value,
  error,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
      />
      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
};
