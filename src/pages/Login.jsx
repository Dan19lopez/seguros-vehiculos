
import Formulario from "../components/Formulario";
import Loggin from "../components/Loggin";
import "./Login.css"


function Login() {

  
  return (
    <div className="login-page">
      <h3 className="titulo">Ingresa a tu cuenta</h3>
            <Formulario className ="formulario" />
      
      <Loggin className = "espalda"/>

      
    </div>
  );
}
export default Login;
