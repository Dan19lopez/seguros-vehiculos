
import BotonCerrar from "../components/BotonCerrar";
import Formulario from "../components/Formulario";
import Loggin from "../components/Loggin";
import "./Login.css"

function Login() {
  /* inicio logica*/













  /*termina logica*/
  
  return (
    <div className="login-page">

      <div className="containerHeader">
      <h3 className="">Ingresa a tu cuenta</h3>
      </div>
     
     <div className="modalIniciarSesion">

        <div className="arribaLogin">
          <p className="">¿Aún no tienes cuenta? Regístrate hoy y accede a los mejores seguros para tu vehiculo.</p>
          <BotonCerrar/>
        </div>
          
        <div className="centroLogin">
          <div className="ladoIzquiero"></div>
          <Formulario className ="ladoDerecho"/>
        </div>
            
        <div className="abajoLogin">
          <Loggin className = ""/>
        </div>

     </div>
  
    </div>
  );
}
export default Login;
