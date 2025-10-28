from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel # ### 1. Importamos BaseModel

# --- Configuración de la App y CORS (esto queda igual) ---
app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ### 2. Definimos una base de datos de usuarios "dummy" (falsa) ###
# En un proyecto real, esto estaría en una base de datos.
# La contraseña es "123"
fake_user_db = {
    "user": {
        "username": "user",
        "password": "123", # ¡En un proyecto real, la contraseña NUNCA se guarda en texto plano!
        "full_name": "Usuario de Prueba"
    }
}

# ### 3. Creamos un "modelo" de Pydantic ###
# Esto le dice a FastAPI cómo debe lucir el JSON que React le enviará.
class UserLogin(BaseModel):
    username: str
    password: str

# --- Endpoints (Rutas) ---

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/test")
def test_route():
    return {"message": "¡Conexión exitosa desde el Backend!"}

# ### 4. NUEVO ENDPOINT DE LOGIN (POST) ###
@app.post("/login")
def login(user_login: UserLogin):
    # Buscamos si el usuario existe en nuestra DB falsa
    user_in_db = fake_user_db.get(user_login.username)

    # Si no existe O la contraseña es incorrecta
    if not user_in_db or user_in_db["password"] != user_login.password:
        # Enviamos un error 401 (No Autorizado)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario o contraseña incorrectos"
        )

    # Si el login es exitoso...
    # Por ahora, solo devolvemos un token falso y un mensaje.
    return {
        "message": "Login exitoso!",
        "token": "token_falso_123456789" 
    }