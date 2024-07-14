import React from "react";
import styles from "./Button.module.scss";

type buttonTypes = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: string;
  className?: string;
};

const Button = (props: buttonTypes) => {
  const {
    type,
    onClick,
    children,
    variant = "primary",
    className,
    disabled,
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
