import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import bglogo from '../../assets/images/logo.png';
import "./signup.css";

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
        <section className="vh-100 d-flex flex-column justify-content-center align-items-center main-login">
            <Container>
                <div className="text-black d-flex align-items-center justify-content-center sigUp-logo">
                    <div className="logo-container">
                        <img src={bglogo} alt="Logo" className="logo-image" />
                    </div>
                </div>
                <h2 className='signup-head'>SignUp</h2>
                <Row>
                    <Col md={12} lg={6} xl={4} className="form-col d-flex flex-column align-items-center">
                        <div className="signup-inner-form">
                            <Form className="login-form" onSubmit={handleSubmit}>
                                <Form.Group className="mb-4" controlId="formFullName">
                                    <Form.Control
                                        className="login-pass"
                                        type="text"
                                        required
                                        placeholder="Full Name"
                                        name="fullName"
                                        value={fullName}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="formEmail">
                                    <Form.Control
                                        className="login-pass"
                                        type="email"
                                        required
                                        placeholder="Email address"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="formPassword">
                                    <div className="password-input-container">
                                        <Form.Control
                                            className="login-pass"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={handleChange}
                                        />
                                        <span className="password-signup-toggle" onClick={togglePasswordVisibility}>
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </span>
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="formConfirmPassword">
                                    <Form.Control
                                        className="login-pass"
                                        type="password"
                                        required
                                        placeholder="Confirm Password"
                                        name="confirmpassword"
                                        value={confirmpassword}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <div className="pt-1 mb-4 main-signupbtn">
                                    <Button variant="info" size="lg" block type="submit" className="login-btn">Sign Up</Button>
                                </div>
                                <p className="para-noaccount">Already have an account? <a href="/" className="noaccount">Login</a></p>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default SignUp;
