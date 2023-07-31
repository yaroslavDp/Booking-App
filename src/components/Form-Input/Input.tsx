import React from "react";
import "./Input.css";

interface FormInputProps {
    title: string;
    name: string;
    type: "text" | "email" | "password";
    isRequired: boolean;
    data: string;
    value?: string;
    onChange:(text:string) => void
  }

const Input:React.FC<FormInputProps> = ({title, name, type, data, value, isRequired, onChange}) => {

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
      }

    return(
        <label className="input">
          <span className="input__heading">{title}</span>
          {type === 'password' ? (
          <input data-test-id={data} value={value} name={name} type={type} onChange={handleOnChange} required={isRequired} minLength={3} maxLength={20} /> 
           ) : (
          <input data-test-id={data} value={value} name={name} type={type} onChange={handleOnChange} required={isRequired} />
           )
        }
        </label>
    )
}


export default Input;