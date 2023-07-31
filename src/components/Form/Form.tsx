import React from "react";
import Button from "../Button/Button";
import Input from "../Form-Input/Input";
import { changeEmail, changeName, changePassword } from "../../store/authSlice/auth-slice";
import { useAppDispatch, useAppSelector } from "../../store/store";

interface FormProps {
    type: "signIn" | "signUp";
    title: string;
    formSubmit: () => void;
}

const Form:React.FC<FormProps> = ({type, title, formSubmit}) => {

    const {email, fullName, password} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();

    const updFullName = (value:string) => {
        dispatch(changeName(value))
    }
    const updEmail = (value:string) => {
        dispatch(changeEmail(value))
    }
    const updPassword = (value:string) => {
        dispatch(changePassword(value))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isSignUp = type === 'signUp';
        if ((isSignUp && fullName && email && password) || (!isSignUp && email && password)) {
            formSubmit();
        }

    }
    return (
        <>
            <form className="sign-up-form" autoComplete="off" onSubmit={handleSubmit}>
                <h2 className="sign-up-form__title">{title}</h2>
                {type === "signUp" ? <Input onChange={updFullName} value={fullName} data="auth-full-name" title="Full name" name="full-name" type="text" isRequired={true} /> : null}
                <Input onChange={updEmail} data="auth-email" value={email} title="Email" name="email" type="email" isRequired={true} />
                <Input onChange={updPassword} data="auth-password" value={password} title="Password" name="password" type="password" isRequired={true} />

                <Button type="submit" data="auth-submit" title={type === "signUp" ? "Sign Up" : "Sign In"} />
            </form>
        </>
    )
}


export default Form;