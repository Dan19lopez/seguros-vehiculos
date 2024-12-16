
import BotonCerrar from "../components/BotonCerrar";
import { useEffect, useState } from "react";
import Formulario from "../components/Formulario";
import Loggin from "../components/Loggin";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  /* inicio logica*/

  const [getCorreo, setCorreo] = useState("");
  const [getContrasena, setContrasena] = useState("");
  const [getCedula, setCedula] = useState("");
  const [getUsuarios, setUsuarios] = useState([]);
  let redirection = useNavigate();

  function iniciarSesion() {
    fetch("http://localhost:7715/usuarios")
      .then((response) => response.json())
      .then((data) => setUsuarios(data));

    const autenticar = getUsuarios.some(
      (usuario) =>
      ((usuario.contrasena == getContrasena && (usuario.correo == getCorreo ||usuario.cedula == getCedula))
    ));

    if (autenticar) {
      let timerInterval;
      Swal.fire({
        title: "Auto close alert!",
        html: "I will close in <b></b> milliseconds.",
        timer: 2000,
        timerProgressBar: true,
        icon: "success",
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
          redirection("/Home");
        },
      });

    }
    /* Validar inicio de sesión con usuario o correo */
  }

  useEffect(() => {
    iniciarSesion();
  }, []);
  /*termina logica*/


  return (
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
  );
}


export default Login;
