import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  size = "medium",
  onClick,
  type = "button",
  disabled = false,
  children,
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${styles["custom-button"]} ${styles[size]} ${
        fullWidth ? styles["full-width"] : ""
      }`}
      onClick={onClick}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {children}
    </button>
  );
};

export default Button;
