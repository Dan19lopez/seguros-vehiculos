
import BotonCerrar from "../components/BotonCerrar";
import FormularioDos from "../components/FormularioDos";
import SingIn from "../components/SingIn";
import "./SingIIn.css"

function SingIIn() {

  /* inicio logica*/













  /*termina logica
  <div className="login-page">

      <div className="containerHeader">
        <h3 className="tituloLogin">Ingresa a tu cuenta</h3>
      </div>

      <div className="modalIniciarSesion">

        <div className="arribaLogin">
          <p className="parrafoLogin">¿Aún no tienes cuenta? Regístrate hoy y accede a los mejores seguros para tu vehiculo.</p>
          <BotonCerrar />
        </div>

        <div className="centroLogin">
          <div className="ladoIzquiero"></div>
          <Formulario setCorreo={setCorreo}  setContrasena={setContrasena} handlerEnviar={iniciarSesion} className="ladoDerecho" />
        </div>

        <div className="abajoLogin">
          <Loggin className="" />
        </div>

      </div>

    </div>
  */

  return (
    <div className="signiin-page">

      <div className="containerHeader">
        <h3 className="tituloSingin">Crea una cuenta</h3>
      </div>

      <div className="modalSingin">

        <div className="arribaSingin">
          <p className="parrafoSingin">Bienvenido de nuevo! Estás a un paso de proteger tu auto con el mejor seguro.</p>
          <BotonCerrar />
        </div>

        <div className="centroSingin">
          <div className="ladoIzquiero"></div>
          <FormularioDos />
        </div>

        <div className="abajoSingin">
          <SingIn className="" />
        </div>
      </div>
    </div>
  );
}
export default SingIIn;
