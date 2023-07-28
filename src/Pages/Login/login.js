import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './login.css';
import bglogo from '../../assets/images/logo.png';
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

    // if (!emailRegex.test(email)) {
    //   setEmailError('Invalid email address');
    //   return;
    // }

    // // if (password.length < 6) {
    // //   setPasswordError('Password must be at least 6 characters long');
    // //   return;
    // // }

    // try {
    //   await LogIn(email, password);
    //   toast.success(('Login Successful'), {
    //     position: "top-center",
    //   });
    //   // alert('Login successful!');
    //   setEmail('');
    //   setPassword('');
    //   navigate('/dashboard');
    //   return;
    // } catch (error) {
    //   alert(`Login failed: ${error.message}`);
    // }
  };

   return (
    <>
      <section className="vh-100 d-flex flex-column justify-content-center align-items-center main-login">
        <Container>
          <div className="text-black d-flex align-items-center justify-content-center sigin-logo">
            <div className="logo-container">
              <img src={bglogo} alt="Logo" className="logo-image" />
            </div>
          </div>
          <h2 className='signup-head'>Login</h2>
          <Row className="mt-4">
            <Col md={{ span: 6, offset: 3 }} xs={12} className="form-col d-flex flex-column align-items-center col-main-color">
              <div className="main-inner-form">
                <Form className="login-form" onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="formEmail">
                    <Form.Control
                      type="email"
                      required
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                      }}
                      isInvalid={emailError !== ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {emailError}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formPassword">
                    <div className="password-input-container">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </span>
                    </div>
                  </Form.Group>

                  <div className="pt-1 mb-4 loginbtn-main">
                    <Button
                      variant="info"
                      size="lg"
                      block
                      type="submit"
                      className="login-btn"
                    >
                      Login
                    </Button>
                  </div>

                  {/* <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p> */}
                  <p className="para-noaccount">Don't have an account? <a href="/signup" className="noaccount">Sign Up</a></p>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default LoginForm;
