import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const auth = useAuth();

  return (
    // Usamos la clase "container" de Pico para centrar
    <div className="App" style={{ padding: '20px' }}>
      <header>
        <h1 style={{ textAlign: 'center' }}>Proyecto Deportes</h1>

        <nav>
          <ul>
            {auth.token ? (
              <>
                <li><Link to="/">Inicio</Link></li>
                <li><button onClick={() => auth.logout()} className="secondary">Cerrar Sesión</button></li>
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>
      </header>

      <hr />

      {/* Envolvemos las rutas en <main> */}
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;