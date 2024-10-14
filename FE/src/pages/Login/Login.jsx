import React, { useState } from "react";
import "./login.css";
import Google from '/SWD392_FE/fe/src/assets/Logo/Google.png';
import Apple from '/SWD392_FE/fe/src/assets/Logo/Apple.webp';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className="login-container">
                <h2 className="form-title">Log in with</h2>
                <div className="social-login">
                    <button className="social-button">
                        <img src={Google} alt="Google" style={{ width: '40px' }} />
                        Google
                    </button>
                    <button className="social-button">
                        <img src={Apple} alt="Apple" style={{ width: '40px' }} />
                        Apple
                    </button>
                </div>

                <p className="separator"><span>or</span></p>

                <form action="#" className="login-form">
                    <div className="input-wrapper">
                        <input type="email" placeholder="Email address"
                            className="input-field" required />
                        <i className="material-symbols-outlined">mail</i>
                    </div>

                    <div className="input-wrapper">
                        <input type={showPassword ? "text" : "password"} placeholder="Password"
                            className="input-field" required />
                        <i className="material-symbols-rounded">lock</i>
                        <i className="material-symbols-rounded" onClick={togglePasswordVisibility} style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                            {showPassword ? "visibility_off" : ""}
                        </i>
                    </div>
                    <a href="#" className="forgot-password-link">Forgot Password?</a>

                    <button className="login-button">Log In</button>
                </form>

                <p className="signup-text">Don't have an account?
                    <a href="#">Signup now</a></p>
            </div>
        </div>
    );
}
