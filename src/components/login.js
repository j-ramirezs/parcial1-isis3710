import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [loginStep, setLoginStep] = useState(1);
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
      email: "", 
      password: "",
      role: Math.random() < 0.5,
    })
  
    const [validationStates, setValidationStates] = useState({
      emailState: true,
      passwordState: true
    })
    
    const handleEmailChange = ((e) => {
        const newEmail = e.target.value;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isEmailValid = emailPattern.test(newEmail);
        setFormValues({ ...formValues, email: newEmail });
        setValidationStates({
            ...validationStates,
            emailState: isEmailValid,
        })
    });
    
    const handlePasswordChange = ((e) => {
      const newPassword = e.target.value;
      const hasValidLength = newPassword.length >= 6;
      setFormValues({ ...formValues, password: newPassword });
      setValidationStates({
        ...validationStates,
        passwordState: hasValidLength
      })
    });

    const clickEmailNext = (() => {
        setLoginStep(2)
    })
    
    
    const clickSubmit = (() => {  

    alert(JSON.stringify(formValues))
    navigate('/main');
    })
  
    return (
    <div>
        {loginStep === 1 ? (
            <div>
            <h3>Acceder</h3>
            <h4>Usa tu cuenta de UniAlpes</h4>
            <Form>
            <Form.Group className="mb-6" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                onChange={handleEmailChange} value={formValues.email}
                className={validationStates.emailState ? "" : "is-invalid"} />
                {!validationStates.emailState && <Form.Text className="text-muted">Invalid
                email format.</Form.Text>}
            </Form.Group>
            <Button variant="primary" onClick={clickEmailNext} disabled={!validationStates.emailState}>
                Siguiente
            </Button>
            </Form>
            </div>
      ) : (
        <div>
            <h3>Acá va el correo</h3>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    {/* Para validacion de la contrasenia, se usa la clase is-invalid de bootstrap */}
                    <Form.Control type="password" placeholder="Password"
                    onChange={handlePasswordChange} value={formValues.password}
                    className={validationStates.passwordState ? "" : "is-invalid"} />
                    {!validationStates.passwordState && <Form.Text
                    className="text-muted">Your password should be at least 6 char long</Form.Text>}
                </Form.Group>
                <Button variant="primary" onClick={clickSubmit} disabled={!validationStates.passwordState}>
                    Siguiente
                </Button>
            </Form>
        </div>
      )}
    </div>
    );
  }
  
  export default Login;