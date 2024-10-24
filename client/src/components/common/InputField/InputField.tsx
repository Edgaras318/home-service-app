import React from "react";
import styles from "./InputField.module.scss";

type InputFieldProps = {
    label: string;
    error?: string;
    placeholder?: string;
    type?: "text" | "email" | "password" | "number"; // Restrict type options
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField: React.FC<InputFieldProps> = ({
                                                   label,
                                                   error,
                                                   type = "text",
                                                   placeholder,
                                                   id, // Destructure id to use it in htmlFor
                                                   ...inputProps
                                               }) => {
    return (
        <div className={styles.inputGroup}>
            <label htmlFor={id}>{label}</label> {/* Use id for htmlFor */}
            <input
                id={id} // Set id for input
                type={type}
                {...inputProps} // This will include name, onChange, onBlur, value, etc.
                placeholder={placeholder}
                className={error ? styles.errorInput : ""} // Add error class if there's an error
            />
            {error && <p className={styles.errorText}>{error}</p>}
        </div>
    );
};

export default InputField;
