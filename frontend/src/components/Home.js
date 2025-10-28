import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 1. Importa tu nuevo componente de IA
import AiClassifier from './AiClassifier';

function Home() {
  const [message, setMessage] = useState("Cargando...");

  useEffect(() => {
    // (Esta llamada al backend sigue igual)
    axios.get('http://127.0.0.1:8000/test')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("Hubo un error al llamar al backend!", error);
        setMessage("Error: No se pudo conectar al backend.");
      });
  }, []);

  return (
    <div> {/* Pico.css no necesita el <article> aquí si vamos a anidar */}

      <article>
        <h2>Página de Inicio (Protegida)</h2>
        <p>Este es el contenido principal de tu aplicación.</p>
        <p>Mensaje del Backend:</p>
        <h3>{message}</h3>
      </article>

      <hr /> 

      {/* 2. Añadimos el componente de IA */}
      <AiClassifier />

    </div>
  );
}

export default Home;