
import { useState } from "react";

function LoginSignintransicion() {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      <div className="form-container sign-up">

        <form id="loginForm">
          <h2>Registrarse</h2>
          <div className="social-icons">
            <ion-icon name="person-add"></ion-icon>
          </div>
          <label htmlFor="registro-nombre">Nombre</label>
          <div className="container-input">
            <ion-icon name="person-outline"></ion-icon>
            <input
              type="text"
              placeholder="Ingrese su nombre"
              id="registro-nombre"
              name="username"
              required
            />
          </div>
          <label htmlFor="registro-correo">Crear usuario</label>
          <div className="container-input">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              type="text"
              placeholder="Ingrese su correo"
              id="registro-correo"
              required
            />
          </div>
          <label htmlFor="registro-contra">Crear contraseña</label>
          <div className="container-input">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              id="registro-contra"
              name="password"
              required
            />
          </div>
          <button type="submit" className="btn-registrar">REGISTRAR</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h2 className="h1">Ingresar </h2>
          <div className="social-icons">
            <ion-icon name="person-circle"></ion-icon>
          </div>
          <label htmlFor="login-correo">Usuario</label>
          <div className="container-input">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              type="text"
              placeholder="Ingrese su correo"
              id="login-correo"
            />
          </div>
          <label htmlFor="login-contra">Contraseña</label>
          <div className="container-input">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              id="login-contra"
            />
          </div>
          <button type="button" className="btn-login">INICIAR SESION</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle" onClick={toggleActive}>
          <div className="toggle-panel toggle-left">
            <h1>¡BIENVENIDO!</h1>
            <p>
              Nos alegra verte de vuelta.Vamos a calcular tu seguro para
              ofrecerte la mejor opción disponible.
            </p>
            <button className="hidden" id="login">INICIAR SESION</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h3>¡HOLA!</h3>
            <p>
              ¡Bienvenido a nuestra calculadora de seguros! <br /> 
              Aquí te ayudaremos a encontrar <br />la cobertura ideal.
            </p>
            <button className="hidden" id="register">REGISTRAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignintransicion;
