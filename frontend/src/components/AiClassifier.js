import React, { useState, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';
import { useAuth } from '../context/AuthContext'; // Importamos el auth para el token

// --- ¡PEGA TU ENLACE AQUÍ! ---
const URL = "https://teachablemachine.withgoogle.com/models/jURl3bz3Q/"; 
// Ejemplo: "https://teachablemachine.withgoogle.com/models/aBcDeFgHi/"

function AiClassifier() {
  // Estados para el modelo, la imagen y las predicciones
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useAuth(); // Obtenemos el contexto de autenticación

  // Cargar el modelo (solo una vez)
  useEffect(() => {
    const loadModel = async () => {
      if (!auth.token) return; // No cargues el modelo si no estás logueado

      setLoading(true);
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      try {
        // Cargamos el modelo desde el enlace
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        console.log("Modelo de IA cargado exitosamente.");
      } catch (error) {
        console.error("Error al cargar el modelo:", error);
        setPredictions([{ className: "Error", probability: "No se pudo cargar el modelo" }]);
      } finally {
        setLoading(false);
      }
    };
    loadModel();
  }, [auth.token]); // Se ejecuta cuando el token cambia (al iniciar sesión)

  // Función cuando el usuario sube un archivo
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result); // Guardamos la URL de la imagen para mostrarla
        setPredictions([]); // Limpiamos predicciones anteriores
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para clasificar la imagen
  const classifyImage = async () => {
    if (!model || !imageURL) {
      alert("Por favor, carga el modelo y una imagen primero.");
      return;
    }

    setLoading(true);
    const imageElement = document.getElementById("uploaded-image");

    try {
      // Hacemos la predicción
      const prediction = await model.predict(imageElement);
      setPredictions(prediction); // Guardamos los resultados
    } catch (error) {
      console.error("Error al predecir:", error);
      setPredictions([{ className: "Error", probability: "No se pudo clasificar" }]);
    } finally {
      setLoading(false);
    }
  };

  // Si no hay token, no mostramos nada
  if (!auth.token) {
    return <p>Debes iniciar sesión para usar la IA.</p>;
  }

  return (
    <article>
      <h2>Clasificador de Imágenes (IA)</h2>

      {/* Mostramos el estado de carga del modelo */}
      {loading && !imageURL && <p>Cargando modelo de IA... <progress></progress></p>}

      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} 
      />

      {/* Mostramos la imagen que el usuario subió */}
      {imageURL && (
        <div style={{ margin: '20px 0' }}>
          <img 
            id="uploaded-image" 
            src={imageURL} 
            alt="Para clasificar" 
            width="300" 
            crossOrigin="anonymous" // Necesario para que el modelo la lea
          />
        </div>
      )}

      {/* Botón para clasificar */}
      {imageURL && (
        <button onClick={classifyImage} disabled={loading}>
          {loading ? "Clasificando..." : "Clasificar Imagen"}
        </button>
      )}

      {/* Resultados de la predicción */}
      {predictions.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Resultados:</h4>
          <ul>
            {predictions.map((p, i) => (
              <li key={i}>
                <strong>{p.className}:</strong> {(p.probability * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export default AiClassifier;