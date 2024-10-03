// InputField.tsx
import React from "react";
import styles from "./InputField.module.scss";

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string; // You can also restrict this to specific types (e.g., 'text', 'email', etc.)
  placeholder?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        id={name} // It's good practice to associate label with input
      />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default InputField;
