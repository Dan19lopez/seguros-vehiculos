
import BotonCerrar from "../components/BotonCerrar";
import { useState } from "react";
import Formulario from "../components/Formulario";
import Loggin from "../components/Loggin";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  /* inicio logica*/

  const loginlogic = () => {
    const [getCorreo, setCorreo] = useState("");
    const [getContrasena, setContrasena] = useState("");
    const [getCedula, setCedula] = useState("");
    const [getUsuarios, setUsuarios] = useState([]);
    let redirection = useNavigate();

    const handleLogin = () => {
      fetch("http://localhost:7715/usuarios")
        .then((response) => response.json())
        .then((data) => {
          setUsuarios(data);

          const autenticar = getUsuarios.some(
            (usuario) =>
              (usuario.contrasena === getContrasena && usuario.correo === getCorreo) ||
              (usuario.cedula === getCedula && usuario.contrasena === getContrasena)
          );

          if (autenticar) {
            let timerInterval;
            Swal.fire({
              title: "¡Inicio de sesión exitoso!",
              html: "Redirigiendo en <b></b> milisegundos.",
              timer: 2000,
              timerProgressBar: true,
              icon: "success",
              didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                  timer.textContent = Swal.getTimerLeft();
                }, 100);
              },
              willClose: () => {
                clearInterval(timerInterval);
                redirection("/loginSignin"); // Redirige al usuario
              },
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Credenciales incorrectas. Inténtalo de nuevo.",
              icon: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Error al obtener usuarios:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudo conectar con el servidor.",
            icon: "error",
          });
        });
    };

    /*termina logica*/


  }
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
          <Formulario className="ladoDerecho" />
        </div>

        <div className="abajoLogin">
          <Loggin className="" />
        </div>

      </div>

    </div>
  );
}


export default Login;
