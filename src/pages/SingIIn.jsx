
import { useState } from "react";
import BotonCerrar from "../components/BotonCerrar";
import FormularioDos from "../components/FormularioDos";
import SingIn from "../components/SingIn";
import "./SingIIn.css"
import { useNavigate } from "react-router-dom";


function SingIIn() {

  /* inicio logica*/
  // Estados para los datos del formulario
  const [getCedula, setCedula] = useState("");
  const [getCorreo, setCorreo] = useState("");
  const [getContrasena, setContrasena] = useState("");

  // Redirección
  let redirection = useNavigate();

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!getCorreo || !getCedula || !getContrasena) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const data = {
      correo: getCorreo,
      cedula: getCedula,
      contrasena: getContrasena,
    };


    
    try {
      const response = await fetch("http://localhost:7715/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("¡Usuario registrado exitosamente!");
        redirection("/login");
      } else {
        alert("Error en el registro");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Ocurrió un error al enviar los datos");
    }

  } /* final de funcion asincronica*/

/*termina logica */

  return (
    <div className="signiin-page">

      <div className="containerHeader">
        <h3 className="tituloLogin">Crea una cuenta</h3>
      </div>

      <div className="modalIniciarSesion">

        <div className="arribaLogin">
          <p className="parrafoLogin">Bienvenido de nuevo! Estás a un paso de proteger tu auto con el mejor seguro.</p>
          <BotonCerrar />
        </div>

        <div className="centroLogin">
          <div className="ladoIzquiero"></div>
          <FormularioDos setCorreo={setCorreo}
            setContrasena={setContrasena}
            setCedula={setCedula}
            handlerEnviar={handleSubmit} />
        </div>

        <div className="abajoLogin">
          <SingIn className="" />
        </div>
      </div>
    </div>
  );
}
export default SingIIn;
