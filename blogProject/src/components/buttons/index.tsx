import React, { type JSX } from 'react';
import styles from "./style.module.css";
type ButtonProps = {
    backgroundColor: string;
    colorText: string;
    text?: string;
    extraStyle?: React.CSSProperties;
    tipo?: "pequeno" | "medio" | "grande";
    children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonComponent = ({ backgroundColor, children, colorText, text, extraStyle, tipo = "medio", ...rest }: ButtonProps): JSX.Element => {

    const sizeClass = styles[tipo];

    return (
        <button {...rest}
            className={`${styles.button} ${sizeClass}`}
            style={{ backgroundColor: backgroundColor, color: colorText, ...extraStyle }}
        >
            {children ? children : text}
        </button>
    )
}

export default ButtonComponent;

