import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ### CAMBIO 1: Estado inicial ###
  // Buscamos el token en localStorage al cargar la app
  const [token, setToken] = useState(localStorage.getItem('token')); 

  const navigate = useNavigate();

  const login = (newToken) => {
    setToken(newToken);

    // ### CAMBIO 2: Guardar en login ###
    localStorage.setItem('token', newToken); 

    navigate('/');
  };

  const logout = () => {
    setToken(null);

    // ### CAMBIO 3: Borrar en logout ###
    localStorage.removeItem('token'); 

    navigate('/login');
  };

  const value = {
    token,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};