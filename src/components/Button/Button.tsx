import React from "react";
import "./Button.css";

interface ButtonProps {
    title:string,
    type: "button" | "submit" | undefined,
    data:string,
    styles?:string,
    onClick?: () => void
}

const Button:React.FC<ButtonProps> = ({title, type, data, styles='', onClick}) => {
    const cls = `button ${styles}`;

    return (
        <button data-test-id={data} className={cls} type={type} onClick={onClick}>
          {title}
        </button>
    )
}

export default Button