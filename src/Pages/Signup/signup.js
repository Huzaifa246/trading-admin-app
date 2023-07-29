import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import bglogo from '../../assets/images/logo.png';
import "./signup.css";
import imgg from '../../assets/images/login_bg.png';

function SignUp() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmpassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { fullName, email, password, confirmpassword } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (password !== confirmpassword) {
        //   alert('Password and Confirm Password do not match.');
        //   return;
        // }

        // try {
        //   await signUp(fullName, email, password, confirmpassword);
        //   // Signup was successful
        //   // console.log(password, "password");
        //   // console.log(confirmpassword, "cfpass");

        //   alert('Signup successful!');
        //   setFormData({
        //     fullName: '',
        //     email: '',
        //     password: '',
        //     confirmpassword: '',
        //   });
        //   setShowPassword(false);
        //   setShowConfirmPassword(false);
        // } catch (error) {
        //   alert(`Signup failed: ${error.message}`);
        // }
    };

    return (

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
                    <div className="text-black d-flex align-items-center justify-content-center sigUp-logo mb-3">
                        <div className="logo-container">
                            <img src={bglogo} alt="Logo" className="logo-image" />
                        </div>
                    </div>
                    <div className="Auth-form-container">
                        <form className="Auth-form" onSubmit={handleSubmit}>
                            <div className="Auth-form-content">
                                <h3 className="Auth-form-title">Sign Up</h3>
                                <div className="Not-yet-style">
                                    Already have an account?
                                    <span className="primary-link">
                                        <a href="/"> Login </a>
                                    </span>
                                </div>
                                <div className="form-group mt-3">
                                    <label className='label-style'>Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control mt-1 form-input-style"
                                        placeholder="Enter email"
                                    />
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
                                <div className="form-group mt-3">
                                    <label className='label-style' htmlFor="password">Confirm Password</label>
                                    <div className="password-input-container">
                                        <input
                                            type={"confimpassword"}
                                            id="password"
                                            className="form-control mt-1 form-input-style"
                                            placeholder="Confirm password"
                                        />
                                    </div>
                                </div>
                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" className="btn btn-primary btn-login">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default SignUp;
