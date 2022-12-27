import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { login as logIn } from './../reducers/userSlice'
import logo from "../images/instagramLogo.png";
import "../styles/loginPage.css";
import { useAppDispatch } from "../hooks";

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [afterFirstValidation, setAfterFirstValidation] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLogin(value)
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPassword(value)
    };

    const onSubmit = () => {
        if (!login || !password) {
            setAfterFirstValidation(true)
            return;
        }
        dispatch(logIn(login));
        navigate("/")
    }

    return (
        <div className="login-area">
            <img src={logo} alt="Instagram logo." />
            <input type="text" className={`${!login && afterFirstValidation ? "error" : ""}`} value={login} onChange={onLoginChange} />
            <input type="password" className={`${!password && afterFirstValidation ? "error" : ""}`} value={password} onChange={onPasswordChange} />
            <button onClick={onSubmit}>Log in!</button>
        </div>
    )
}

export default LoginPage