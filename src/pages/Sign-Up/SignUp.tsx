import React from "react";
import MainSection from "../../components/MainSection";
import Loader from "../../components/Loader/Loader";
import Form from "../../components/Form/Form";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signUp } from "../../store/authSlice/auth-slice";

const SignUp:React.FC = () => {
    const dispatch = useAppDispatch();
    const {loading} = useAppSelector( state => state.auth )
    const handleSignUp = () => {
        dispatch(signUp());
    }

    return (
        <>
             {loading ? <Loader/> : <MainSection className="sign-up-page">
                <Form title="Sign Up" type="signUp" formSubmit={handleSignUp} />
                <span>
                    Already have an account? &nbsp;

                    <Link data-test-id="auth-sign-in-link" to="/sign-in" className="sign-up-form__link">
                        Sign Up
                    </Link>
                </span>
            </MainSection>}
        </>
    )
}

export default SignUp;