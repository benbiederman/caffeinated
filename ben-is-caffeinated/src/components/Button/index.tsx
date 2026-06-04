import styles from "./Button.module.scss";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string;
  label: string;
  className?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label = "", variant = "primary", className = "", ...props }, ref) => {
    return (
      <button
        className={`
        ${styles.button}
        ${styles[variant]}
        ${className}
      `}
        ref={ref}
        {...props}
      >
        {label}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
