# parcial1-isis3710

## Ejecución del parcial

Para la ejecución del parcial se debe estar localizado en la carpeta parcial1 y ejecutar el comando npm start.

Posterior a esto se abrirá una ventana del browser con la URL: http://localhost:3000 donde se podrá visualizar el contenido del parcial.

Automáticamente será redirigido a la dirección http://localhost:3000/login desde donde se podrán evidenciar todos los elementos del parcial.

## Reporte de decisiones y proceso de desarrollo

Para el reporte de decisiones y proceso de desarrollo se realizará una explicación por cada componente creado.

### index.js
```
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Container>
      <Row xs={1}>
        <Col>
          <App />
        </Col></Row>
    </Container>
  </React.StrictMode>
);
```
En este componente se renderizan elementos gráficos de organización para la aplicación y se llama al componente <App />.

### App.js
```
function App() {

  const detectBrowserLanguage = () => {
    const userLanguage = navigator.language || navigator.userLanguage;
    return userLanguage;
  };

  const userLanguage = detectBrowserLanguage();

  const translations = {
    en: enMessages,
    es: esMessages,
  };


  const [carData, setCarData] = useState([]);

  const githubJsonUrl = 'https://raw.githubusercontent.com/j-ramirezs/parcial1-isis3710/main/datos.json';
  
  useEffect(() => {
    fetch(githubJsonUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCarData(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <IntlProvider locale={userLanguage} messages={translations[userLanguage]}>
      <FormValuesProvider>
        <div className="App">
            <AppRouter carData={carData}/>
        </div>
      </FormValuesProvider>
    </IntlProvider>
    
  );
}

export default App;
```
En este componente se inicia con una función para detectar el idioma del browser (const detectBrowserLanguage = () => {...};) con motivos de internacionalización y se guarda el valor en una constante (const userLanguage = detectBrowserLanguage();)

Seguidamente se establece una constante con los archivos de inglés y español para la internacionalización.

Se continua utilizando un hook de estado para obtener los datos de los vehículos. Que posteriormente se obtienen con un fetch a la url de GitHub, este proceso tiene catch y throw error por si se genera algún problema en este proceso.

Finalmente, en el return para la renderización de elementos, se envuelve toda la aplicación con un tag IntlProvider para la internacionalización y con un tag de FormValuesProvider con el fin de poder acceder a los datos del login en cualquier lado de la apliación (esto se explicará con más a detalle posteriormente).

Finalmente se renderiza el componente AppRouter, pasándole como parámetro los datos extraidos del JSON. El AppRouter se encargará de manejar las rutas en la aplicación.

### AppRouter.js
```
const AppRouter = ({ carData }) => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cars" element={<Cars carData={carData} />} />
        <Route path="/car/:carMaker" element={<Car carData={carData} />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
```

En este componente, se define el routing de la aplicación, estableciendo para cada componente su ruta definida. También se le envía por parámetro los datos de los carros para los componentes que la requieran (Cars y Car). Finalmente se establece que ante una ruta no establecida redireccione el usuario al login de la aplicación.

### login.js
```
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
```

El componente login.js maneja todo el despliegue de los elementos relacionados con el login de la aplicación.

Primero se establece un hook de estado para determinar si se está en la parte de ingresar correo o contraseña. Se inicializa en 1 ya que se empezará lógicamente con el ingreso del correo.

Se establece luego el useNavigate() para poder navegar entre los diferentes componentes de la aplicación.

Seguidamente se utiliza el contexto FormValuesContext para almacenar los valores de email, contraseña y rol que estarán disponibles para los componentes que lo requieran.

Se establece un hook de estado para los estados de validación que comienzan en falso.

Se establecen funciones para el manejo de cambio de correo y contraseña haciendo uso de expresiones regulares para verificar el formato del correo y una simple validación de longitud para la contraseña (>= 6 caracteres).

Se establece por último una función para manejar el click del botón siguiente, que simplemente redireccionará al usuario a la página para ingresar su contraseña.

En el return para la renderización de elementos, se inicia con un if, para determinar en que etapa del login se encuentra. Si se encuentra en la primera despliega una tarjeta con todo lo correspondiente a la primera etapa, de lo contrario renderiza lo necesario para la segunda etapa.

En cuanto a cada etapa, se renderiza un formulario con los campos de email y contraseña (de acuerdo con la etapa) y se realizan las validaciones correspondientes para cada campo. Finalmente se habilita o deshabilita el botón de siguiente de acuerdo con si las validaciones se cumplen o no. A este componente se le aplica internacionalización para cada etapa con el uso de <Formatted.Message> de react-intl.

### cars.js
```
function Cars({carData}) {

  return (
      <Container>
      <Row>
        {carData.map((item, index) => (
          <Col key={index} xs={12} md={4}>
            <Link to={`/car/${item.carMaker}`}>
            <Card>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.partName}</Card.Title>
                <Card.Title>{item.carMaker}</Card.Title>
                <Card.Text>{`${item.price} ${'-'} ${item.carYear}`}</Card.Text>
              </Card.Body>
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Cars;
```
En este componente se despliega un arreglo de tarjetas con cada tarjeta conteniendo la información de cada carro (que viene del JSON). Se utiliza un Container con Cols y Rows para el despliegue del grid de tarjetas y el componente Card para el despliegue de cada tarjeta. En cada tarjeta, se despliega como imagen la que viene del JSON. Como tíulos el nombre de la parte y la marca del carro y como texto (en una misma línea) el precio y el año del carro separados por un guión. No se aplica internacionalización de este componente ya que todos los textos que se renderizan vienen directamente de los datos.

### car.js
```
const Car = ({ carData }) => {

  const { formValues } = useContext(FormValuesContext);
  const role = formValues.role;

  const { carMaker } = useParams();
  const car = carData.find((item) => item.carMaker === carMaker);

  if (!car) {
    return <div>Car not found</div>;
  }

    return (
      <Container>
      <Row>
        <Col xs={12} md={6}>
          <div className="image-container">
            <Image src={car.image} />
          </div>
        </Col>
        <Col xs={12} md={6}>
          <h3>{car.partName}</h3>
          <Table borderless className="custom-table">
            <tbody>
              <tr>
                <td><FormattedMessage id="CarMakerText"/></td>
                <td>{role? <input type="text" defaultValue={car.carMaker} /> : <p>{car.carMaker}</p>}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="CarModelText"/></td>
                <td>{role? <input type="text" defaultValue={car.carModel} /> : <p>{car.carModel}</p>}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="CarYearText"/></td>
                <td>{role? <input type="number" defaultValue={car.carYear} /> : <p>{car.carYear}</p>}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="AvailableText"/></td>
                <td>{role? <input type="text" defaultValue={car.available ? 'Yes' : 'No'} /> : <p>{car.available ? 'Yes' : 'No'}</p>}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="PriceText"/></td>
                <td>{role? <input type="text" defaultValue={car.price} /> : <p>{car.price}</p>}</td>
              </tr>
            </tbody>
          </Table>
          <p className="description-text"><FormattedMessage id="DescriptionText"/></p>
          <p>{car.description}</p>
        </Col>
      </Row>
    </Container>
    );
};

export default Car
```

Este componente inicia con el establecimiento de una constante con useContext para obtener los datos del login del usuario, especialmente el rol que se almacena en la constante role. Seguidamente se utiliza un useParams() para almacenar en una constante la marca del carro, que se estableció como el identificador del mismo (ya que no hay carros con la misma marca en el JSON). Seguidamente se obtuvo el carro comparando cada elemento con la marca del carro hasta obtener una coincidencia. En tal caso de no encontrarse el carro, se le notifica al usuario.

Para la renderización de elementos gráficos, se utiliza un container con dos columnas, la primera donde se renderiza la imagen, y la segunda los detalles del carro. Para la renderización de los detalles del carro se utiliza una tabla sin bordes, donde en la primera columna se renderizan los títulos (internacionalizados) y en la segunda el valor (obtenido del JSON).

Para la renderización de los valores del JSON, se utiliza una renderización condicional, es decir, para cada campo se verifica si el rol del usuario es true o false. Para el primer caso se renderiza un input modificable con valor por defecto con origen en el JSON y para el segundo caso simplemente un texto con el valor directamente. Cabe resaltar que para el caso de available, se traduce false a No y true a Yes.

Nuevamente se utiliza internacionalización con FormattedMessage para los títulos de cada elemento.

### formValuesContext.js
```
const FormValuesContext = createContext();

export const FormValuesProvider = ({ children }) => {
  const [formValues, setFormValues] = useState({
    email: '', 
    password: '',
    role: Math.random() < 0.5,
  });

  return (
    <FormValuesContext.Provider value={{ formValues, setFormValues }}>
      {children}
    </FormValuesContext.Provider>
  );
};

export default FormValuesContext;
```

Como se mencionó anteriormente, la función de este componente es hacer disponible los valores del login del usuario para los componentes que requieran consumirlos (en este caso el componente car.js). En este código se establece un contexto y luego se establece un hook de estado para los valores de email, contraseña y rol. El rol se establece aleatoriamente como true o false. Finalmente se retorna (a quien lo solicite) los valores del formulario.

Disclaimer para internacionalización: No se internacionalizan los placeholders para correo y contraseña en el login ya que los componentes de React <Formatted... /> están diseñados para ser utilizados en escenarios de renderización y no deben usarse en espacios reservados, texto alternativo, etc. Estos componentes generan HTML, no texto plano, lo cual no es útil en el caso de los placeholders.



