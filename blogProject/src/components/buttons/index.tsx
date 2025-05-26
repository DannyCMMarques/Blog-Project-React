import React, { type JSX } from 'react'
import style from "./style.module.css";

type ButtonProps = {
    handleOnClick: () => void;
    backgroundColor: string;
    colorText: string;
    text: string;
    extraStyle?: React.CSSProperties;
};

const ButtonComponent = ({ handleOnClick, backgroundColor, colorText, text, extraStyle }: ButtonProps): JSX.Element => {
    return (
        <button className={style.button} onClick={handleOnClick} style={{ backgroundColor: backgroundColor, color: colorText, ...extraStyle }}>
            {text}
        </button>
    )
}

export default ButtonComponent;

