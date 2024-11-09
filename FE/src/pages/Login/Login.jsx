import React, { useState } from "react";
import "./login.css";
import Google from '/src/assets/Logo/Google.png';
import Apple from '/src/assets/Logo/Apple.webp';
import { useNavigate } from 'react-router-dom'; // Để điều hướng sau khi đăng nhập thành công

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Dùng hook useNavigate để điều hướng sau khi đăng nhập thành công

    // Hàm kiểm tra mật khẩu và email
    const handleLogin = async (e) => {
        e.preventDefault();

        // Gửi yêu cầu đến API giả để kiểm tra người dùng
        const response = await fetch('http://localhost:5000/users');
        const users = await response.json();

        // Tìm kiếm người dùng trong dữ liệu giả
        const user = users.find(
            (user) => user.email === email && user.password === password
        );

        if (user.role === 1) {
            localStorage.setItem('userId', JSON.stringify(user)); // Lưu thông tin người dùng vào localStorage
            alert('Đăng nhập thành công!');
            navigate('/home'); // Điều hướng đến trang home
        }
         else {
            // setError('Email hoặc mật khẩu không đúng.');
            navigate('/admin');
        }
    };

    // Hàm toggle hiển thị mật khẩu
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div id="LoginPage">
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

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-wrapper">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="input-field"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <i className="material-symbols-outlined">mail</i>
                    </div>

                    <div className="input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="input-field"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className="material-symbols-rounded">lock</i>
                        <i
                            className="material-symbols-rounded"
                            onClick={togglePasswordVisibility}
                            style={{
                                cursor: 'pointer',
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)'
                            }}
                        >
                            {showPassword ? "visibility_off" : ""}
                        </i>
                    </div>

                    <a href="#" className="forgot-password-link">Forgot Password?</a>

                    <button className="login-button" type="submit">Log In</button>

                    {error && <p className="error-message">{error}</p>}
                </form>

                <p className="signup-text">Don't have an account?
                    <a href="#">Signup now</a>
                </p>
            </div>
        </div>
    );
}
