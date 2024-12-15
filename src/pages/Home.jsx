import React from "react";
import "./Home.css";
import SeccionTarjetas from "../components/SeccionTarjetas";
import { useNavigate } from "react-router-dom";

const Home = () => {

let redireccion = useNavigate();
const handleClick =()=>{
  redireccion("/login")
}

  return (
    <div className="home-container">
      {/* Barra Superior */}
      <header className="header">
        <div className="logo">
          <img src="/src/img/Logo.jpg" alt="Logo" className="logo-image" />
        </div>
        <nav className="nav">
          <button  type="button" className="login-button" onClick={handleClick}>Iniciar Sesión</button>
        </nav>
      </header>

      {/* Sección principal */}
<section className="hero-section">
  <div className="video-background">
  <iframe width="560"
   height="315" 
   src="https://www.youtube.com/embed/8FpXGOd_8u4?si=U1MbF_kioGSBXd8h" 
   title="YouTube video player"
    frameborder="0"
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </div>
  <div className="hero-overlay">
    <h1>¡Asegura tu auto!</h1>
    <p>Protege tu vehículo con nosotros, porque tu tranquilidad es nuestra prioridad.</p>
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
      <section className="info-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: '1.3rem' }}>
  <div className="info-content" style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
    <div className="info-text" style={{ flex: 1 }}>
      <p style={{ textAlign: 'justify', lineHeight: '1.8' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.7rem' }}>¡¿Sabías que cada día se registran más de <strong>500 accidentes de tránsito</strong> en Colombia?!</span> <br />
        En promedio, esto representa más de <strong>20 incidentes por hora</strong>, afectando familias, negocios y comunidades enteras. <br />
        En esos momentos críticos, son las aseguradoras las que responden, protegiendo vidas y bienes.
      </p>
    </div>
    <div className="info-images" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <img src="/src/img/Home4.webp" alt="Auto asegurado" style={{ width: '80%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} />
    </div>
    <div className="info-text" style={{ flex: 1 }}>
      <p style={{ textAlign: 'justify', lineHeight: '1.8' }}>
        Con nuestros planes, no solo aseguramos tu vehículo, ¡lo protegemos como si fuera nuestro! <br />
        Te ofrecemos <strong>servicio 24/7</strong> y coberturas que se adaptan a tus necesidades, porque sabemos que tu tranquilidad no tiene precio. <br />
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>¡Únete a nuestra familia y maneja con confianza!</span>
      </p>
    </div>
  </div>
</section>




      {/* Mapa */}
      <section className="map-section">
      <div className="contact-info">
        <h2>Contáctanos</h2>
        <h3>Teléfono: 800-123-4567</h3>
        <h3>Email: atencion@seguros.com</h3>
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
        <p>&copy; 2024 Seguros . Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;