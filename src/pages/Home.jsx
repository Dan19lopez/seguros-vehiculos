import React from "react";
import "./Home.css";
import SeccionTarjetas from "../components/SeccionTarjetas";

const Home = () => {
  return (
    <div className="home-container">
      {/* Barra Superior */}
      <header className="header">
        <div className="logo">
          <img src="/src/img/Home3.jpg" alt="Logo" className="logo-image" />
        </div>
        <nav className="nav">
          <span className="nav-title">COLMENAR</span>
          <button  type="button" className="login-button">Iniciar Sesión</button>
        </nav>
      </header>

      {/* Sección principal */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>¡Asegura tu auto!</h1>
          <p>Protege tu vehículo con  Colmenar, porque tu tranquilidad es nuestra prioridad.</p>
        </div>
      </section>

      {/* Sección de Estadísticas */}
      <section className="stats-section">
        <div className="stats-banner">
          <h2>¡Obtén un 20% de descuento en tu primera póliza!</h2>
          <button className="stats-button">¡Asegura tu vehículo!</button>
        </div>
        <div className="stats">
          <div className="stat-item">
            <h3>99%</h3>
            <p>Clientes satisfechos</p>
          </div>
          <div className="stat-item">
            <h3>10,000+</h3>
            <p>Autos asegurados</p>
          </div>
          <div className="stat-item">
            <h3>5 estrellas</h3>
            <p>Calificación promedio</p>
          </div>
        </div>
      </section>
    
    <SeccionTarjetas/>


      {/* Sección de Información */}
      <section className="info-section">
        <div className="info-content">
          <div className="info-images">
            <img src="/src/img/Home4.webp" alt="Auto asegurado 1" />
          </div>
          <p>
            ¡Asegura tu vehículo hoy! En Colmenar, no solo aseguramos vehículos, ¡los protegemos como si fueran nuestros! Con años de experiencia, sabemos lo que necesitas para sentirte seguro en la carretera. ¡Únete a la familia Colmenar y maneja con confianza!
          </p>
        </div>
      </section>

      {/* Mapa */}
      <section className="map-section">
      <div className="contact-info">
        <h2>Contáctanos</h2>
        <h3>Teléfono: 800-123-4567</h3>
        <h3>Email: atencion@colmenar.com</h3>
        <h3>Dirección: Calle de los Seguros, 123</h3>
        <h3>Horario de Atención: Lunes a Viernes, 9am - 6pm</h3>
        </div>
        <iframe
          title="Ubicación en Medellín"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d198819.34667813266!2d-75.637393!3d6.244204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4691f768fed3ed%3A0x26a68c3852a6da3e!2sMedell%C3%ADn%2C%20Antioquia%2C%20Colombia!5e0!3m2!1ses-419!2sco!4v1701234567890"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>

      {/* Pie de Página */}
      <footer className="footer">
        <p>&copy; 2024 Seguros Colmenar. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;