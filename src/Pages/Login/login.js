import React, { useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import './login.css';
import bglogo from '../../assets/images/logo.png';
import imgg from '../../assets/images/login_bg.png';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { decryption, encryption } from '../../Services/encryptionDecryption';
import AuthSession from './../../Services/getAuthSessions';
import Loader from '../../components/Loader/Loader';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthDataContext } from '../../store';

function LoginForm() {
    const { authData } = useContext(AuthDataContext);
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [loginError, setLoginError] = useState("")

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setLoginError("Invalid Email or Password")
            return
        }
        setShowLoader(true)
        const credentials = {
            email: email,
            password: password
        }
        const encrypted = encryption(credentials)
        console.log(encrypted, "encrypted data")

        axios.post(`${process.env.REACT_APP_API}/api/admin/login`, {
            data: encrypted
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(async(res) => {
                console.log(res, "res")
                let decrypted = decryption(res?.data?.data)
                console.log(decrypted, "decrypted")
                localStorage.setItem("token", decrypted?.data)
                // let token = localStorage.getItem("token");
                // console.log(token)
                // const result = await AuthSession(setAuthData);
                // console.log(result, "Authsession")
                // if (result) {
                    setShowLoader(false)
                    navigate("/dashboard")
                // }
                // else {
                //     setShowLoader(false)
                //     // window.location.reload();
                //     return navigate("/")
                // }
            })
            .catch((err) => {
                // console.log(err)
                const decrypted = decryption(err?.response?.data?.data)
                console.log(decrypted, "das")
                if (decrypted?.message.includes("Admin Not Found.")) {
                    setLoginError("Invalid Credentials, Please Check email.")
                } else if (decrypted?.message.includes("Admin password is wrong.")) {
                    setLoginError("Invalid Password, Please Check Your Password.")
                }
                else {
                    setLoginError("An error occurred, Check Credentials");
                }
                setShowLoader(false)
            })
    }

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
                                    <div className="form-group mt-3">
                                        <label className='label-style'>Email address</label>
                                        <input type="email" name="email" id="email" placeholder='abc@xyz.com'
                                            className="form-control mt-1 form-input-style"
                                            value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label className='label-style' htmlFor="password">Password</label>
                                        <div className="password-input-container">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                className="form-control mt-1 form-input-style"
                                                placeholder="Enter password"
                                                value={password} onChange={e => setPassword(e.target.value)}
                                                required
                                            />
                                            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                                {showPassword ? <FiEyeOff /> : <FiEye />}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 mt-3 mb-3">
                                        <button type="submit" className="btn btn-primary btn-login">
                                            Login
                                        </button>
                                    </div>
                                    {
                                        showLoader
                                        &&
                                        <Loader />
                                    }
                                    {
                                        loginError
                                        &&
                                        <p style={{ margin: "1rem 0 0", color: "red", textAlign: "center" }}>{loginError}</p>
                                    }
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
