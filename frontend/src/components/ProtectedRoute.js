import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Este componente recibe "children", que en nuestro caso será <Home />
function ProtectedRoute({ children }) {
  const auth = useAuth();

  if (!auth.token) {
    // Si NO hay token (usuario no logueado),
    // lo redirigimos a la página de login.
    // 'replace' evita que pueda volver atrás con la flecha del navegador.
    return <Navigate to="/login" replace />;
  }

  // Si hay un token, simplemente mostramos el componente hijo (Home)
  return children;
}

export default ProtectedRoute;