import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './login.css';
import bglogo from '../../assets/images/logo.png';
import imgg from '../../assets/images/login_bg.png';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

    };

    return (
        <>
            <div
                className="login-card auth-login"
                style={{
                    backgroundImage: `url(${imgg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    width: "100%",
                }}
            >
                <section className="vh-100 d-flex flex-column justify-content-center align-items-center main-login">
                    <Container>
                        <div className="text-black d-flex align-items-center justify-content-center sigin-logo mb-3">
                            <div className="logo-container">
                                <img src={bglogo} alt="Logo" className="logo-image-login" />
                            </div>
                        </div>
                        <div className="Auth-form-container">
                            <form className="Auth-form" onSubmit={handleSubmit}>
                                <div className="Auth-form-content">
                                    <h3 className="Auth-form-title">Sign In</h3>
                                    <div className="Not-yet-style">
                                        Not registered yet?
                                        <span className="primary-link">
                                            <a href="/signUp"> Sign Up</a>
                                        </span>
                                    </div>
                                    <div className="form-group mt-3">
                                        <label className='label-style'>Email address</label>
                                        <input
                                            type="email"
                                            className="form-control mt-1 form-input-style"
                                            placeholder="Enter email"
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label className='label-style' htmlFor="password">Password</label>
                                        <div className="password-input-container">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                className="form-control mt-1 form-input-style"
                                                placeholder="Enter password"
                                            />
                                            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                                {showPassword ? <FiEyeOff /> : <FiEye />}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 mt-3">
                                        <button type="submit" className="btn btn-primary btn-login">
                                            Submit
                                        </button>
                                    </div>
                                    <p className="text-right mt-2">
                                        <a href="#">Forgot password?</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </Container>
                </section>
            </div>
        </>
    );
}

export default LoginForm;
