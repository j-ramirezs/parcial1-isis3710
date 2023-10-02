import { useState, useContext} from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormValuesContext from './formValuesContext'
import { FormattedMessage } from "react-intl";

function Login() {
    const [loginStep, setLoginStep] = useState(1);
    const navigate = useNavigate();

    const {formValues, setFormValues} = useContext(FormValuesContext);
  
    const [validationStates, setValidationStates] = useState({
      emailState: false,
      passwordState: false
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

    console.log(JSON.stringify(formValues))
    navigate('/cars');
    })
  
    return (
    <div class="d-flex align-items-center justify-content-center">
        {loginStep === 1 ? (
            <div>
                <Card style={{ width: '30rem' }} className="text-center">
                    <Card.Body>
                        <Card.Title>
                            <FormattedMessage id="EmailHeader"/>
                        </Card.Title>
                        <Card.Text>
                            <FormattedMessage id="EmailSubHeader"/>
                        </Card.Text>
                        <Card.Text>
                        <Form>
                            <Form.Group className="mb-6" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Email"
                                onChange={handleEmailChange} value={formValues.email}
                                className={validationStates.emailState ? "" : "is-invalid"} />
                                {!validationStates.emailState && <Form.Text className="text-muted">
                                    <FormattedMessage id="EmailValidationMessage"/></Form.Text>}
                            </Form.Group>
                        </Form>
                        </Card.Text>
                        <Button variant="primary" onClick={clickEmailNext} disabled={!validationStates.emailState}>
                            <FormattedMessage id="Next"/>
                        </Button>
                    </Card.Body>
                </Card>
            </div>
      ) : (
        <div>
            <Card style={{ width: '30rem' }} className="text-center">
                    <Card.Body>
                        <Card.Title>{formValues.email}</Card.Title>
                        <Card.Text>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password"
                                onChange={handlePasswordChange} value={formValues.password}
                                className={validationStates.passwordState ? "" : "is-invalid"} />
                                {!validationStates.passwordState && <Form.Text
                                className="text-muted"><FormattedMessage id="PasswordValidationMessage"/></Form.Text>}
                            </Form.Group>
                        </Form>
                        </Card.Text>
                        <Card.Text>
                            <Button variant="primary" onClick={clickSubmit} disabled={!validationStates.passwordState}>
                                <FormattedMessage id="Next"/>
                            </Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
        </div>
      )}
    </div>
    );
  }
  
  export default Login;