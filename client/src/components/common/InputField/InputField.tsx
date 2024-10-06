import React from "react";
import styles from "./InputField.module.scss";

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: "text" | "email" | "password" | "number"; // Restrict type options
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
            id={name}
            aria-label={label} // Added for accessibility
            className={error ? styles.errorInput : ''} // Add error class if there's an error
        />
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
  );
};

export default InputField;
