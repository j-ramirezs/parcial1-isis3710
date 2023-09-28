import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const [dataGET, setDataGet] = useState("{}")

    useEffect(()=>{
        fetch("https://my.api.mockaroo.com/test_schema.json?key=").then(response => response.json()).then(data => setDataGet(JSON.stringify(data)))
    })

    // Estado para los valores del formulario
    const [formValues, setFormValues] = useState({
      email: "", 
      password: "",
      role: true
    })
  
    // Estado para la validacion de correo y contrasenia
    const [validationStates, setValidationStates] = useState({
      // Ambos se inicializan en true (validos)
      emailState: true,
      passwordState: true
    })
    
    const handleEmailChange = ((e) => {
      // No se maneja validacion aca, ya que para el correo es luego de que se haga submit
      setFormValues({ ...formValues, email: e.target.value })
    });
    
    const handlePasswordChange = ((e) => {
      const newPassword = e.target.value;
  
      // Manejo constantes para validacion, que tenga numero(s), letra(s) y sea mayor o igual a 9 caracteres
      const hasNumber = /\d/.test(newPassword);
      const hasLetter = /[a-zA-Z]/.test(newPassword);
      const hasValidLength = newPassword.length >= 9;
  
      setFormValues({ ...formValues, password: newPassword });
      // Cambie el estado si la contrasenia no es valida
      setValidationStates({
        ...validationStates,
        passwordState: hasNumber && hasLetter && hasValidLength
      })
    });
    
    const handleSelectChange = ((e) => {
      setFormValues({ ...formValues, favClass: e.target.value })
    });
    
    const clickSubmit = (() => {
      // RegEx y validacion para el formato del correo
      // Se hace aca porque el correo se valida al hacer submit 
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const isEmailValid = emailPattern.test(formValues.email);
  
      // Si el correo no es valido cambie el estado del correo a false
      if(!isEmailValid) {
        setValidationStates({
          ...validationStates,
          emailState: false,
        });
        // Retorna para no seguir con la ejecucion
        return;
      }
  
      // Si si es valido, cambie el estado a tsrue
      setValidationStates({
        ...validationStates,
        emailState: true,
      });

    //   handlePost(formValues)
    //   alert(JSON.stringify(dataGET))
      navigate('/main');
      })
  
    return (
      <div>
        <h1>Ejemplo de formularios!</h1>
  
        <Form>
          <Form.Group className="mb-6" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            {/* Para validacion del correo, se usa la clase is-invalid de bootstrap */}
            <Form.Control type="email" placeholder="Enter email"
              onChange={handleEmailChange} value={formValues.email}
              className={validationStates.emailState ? "" : "is-invalid"} />
            {!validationStates.emailState && <Form.Text className="text-muted">Invalid
            email format.</Form.Text>}
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            {/* Para validacion de la contrasenia, se usa la clase is-invalid de bootstrap */}
            <Form.Control type="password" placeholder="Password"
              onChange={handlePasswordChange} value={formValues.password}
              className={validationStates.passwordState ? "" : "is-invalid"} />
            {!validationStates.passwordState && <Form.Text
              className="text-muted">Your password should be have numbers and letters and
              should be at least 9 char long</Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Favorite Class</Form.Label>
            <Form.Select onChange={handleSelectChange}>
              <option value="1">ISIS3710</option>
              <option value="2">Programación con tecnologias web</option>
            </Form.Select>
          </Form.Group>
          {/* Se inhabilita el boton de submit si la contrasenia es invalida */}
          <Button variant="primary" onClick={clickSubmit} disabled={!validationStates.passwordState}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
  
  export default Login;