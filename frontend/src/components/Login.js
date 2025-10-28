import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault(); 
    setError(''); 

    axios.post('http://127.0.0.1:8000/login', {
        username: username,
        password: password
    })
    .then(response => {
        auth.login(response.data.token);
    })
    .catch(error => {
        console.error("Error en el login:", error.response.data);
        setError(error.response.data.detail || "Error desconocido");
    });
  };

  return (
    // Usamos <article> para que Pico lo muestre como una "tarjeta"
    <article style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario</label>
        <input 
          type="text" 
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input 
          type="password" 
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <small style={{ color: 'var(--pico-color-invalid)' }}>{error}</small>}

        <button typeT="submit" style={{ marginTop: '10px' }}>Entrar</button>
      </form>
    </article>
  );
}

export default Login;