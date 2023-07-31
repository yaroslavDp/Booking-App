import React from "react";
import MainSection from "../../components/MainSection";
import Form from "../../components/Form/Form";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signIn } from "../../store/authSlice/auth-slice";
import Loader from "../../components/Loader/Loader";


const SignIn:React.FC = () => {

    const dispatch = useAppDispatch();
    const {loading} = useAppSelector( state => state.auth )
    const handleSignIn = () => {
        dispatch(signIn())
    }
    return (
        <>
            {loading ? <Loader/> : <MainSection className="sign-in-page">
                <Form title="Sign In" type="signIn" formSubmit={handleSignIn} />
                <span>
                    Don't have an account?&nbsp;

                    <Link data-test-id="auth-sign-up-link" to="/sign-up" className="sign-in-form__link">
                        Sign Up
                    </Link>
                </span>
            </MainSection>}
        </>
    )
}

export default SignIn;