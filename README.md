Descripción de Componentes y Planes del Proyecto (Clasificador de Deportes)
Front-end

Descripción: Es la interfaz de usuario (UI) construida en React. La aplicación controla el acceso mediante un sistema de inicio de sesión (/login) que protege la página principal. Una vez autenticado, el usuario accede al panel principal (/) donde reside el clasificador de IA. El front-end utiliza TensorFlow.js para cargar y ejecutar el modelo de IA directamente en el navegador (client-side). El usuario sube una imagen, y la interfaz muestra inmediatamente los resultados con sus puntuaciones de confianza ("Futbol: 95%", "Tennis: 3%").

Planes a Futuro: Mejorar la experiencia de usuario del clasificador, quizás permitiendo arrastrar y soltar imágenes.

Back-end
Descripción: El servidor está montado en FastAPI. Su responsabilidad actual no es la IA, sino el control de acceso y autenticación. Tiene un endpoint principal (POST /login) que recibe un usuario y contraseña, los valida contra una base de datos, y si tiene éxito, genera y devuelve un Token para que el front-end inicie la sesión. También expone un endpoint de prueba para verificar la conexión.

Planes a Futuro: El plan inmediato es completar la implementación de seguridad, creando "dependencias" en FastAPI que validen el token en cada petición protegida. A mediano plazo, se planea migrar el modelo de IA del front-end al back-end; esto centralizará la lógica, protegerá el modelo y permitirá crear un endpoint que reciba la imagen y devuelva la predicción.

Utilizar una IA
Descripción: Es el componente interactivo principal. Se trata de un modelo de clasificación de imágenes creado con Teachable Machine. Este modelo es exportado en formato TensorFlow.js y se carga directamente en el front-end. Su trabajo es tomar el elemento de imagen, procesarlo en el navegador del cliente y devolver un arreglo de predicciones.

Planes a Futuro: La prioridad es mejorar la precisión del modelo. Esto se logrará re-entrenándolo con un dataset mucho más grande y variado. A mediano plazo, planeamos añadir más categorías de deportes y experimentar con arquitecturas de modelos más complejas (no solo Teachable Machine) una vez que la IA se migre al backend.

Capturas:

<img width="1906" height="894" alt="image" src="https://github.com/user-attachments/assets/d2e5ad57-6572-4053-b6f4-e3eecee9b20f" />
<img width="1887" height="763" alt="image" src="https://github.com/user-attachments/assets/10a41953-2967-48cd-8df5-7e7dc3d92079" />
<img width="1884" height="347" alt="image" src="https://github.com/user-attachments/assets/11c4d819-6369-4287-b5da-702e903da03a" />
<img width="1879" height="836" alt="image" src="https://github.com/user-attachments/assets/0504413a-9585-40bd-9cab-70b581bcd13f" />
<img width="1843" height="887" alt="image" src="https://github.com/user-attachments/assets/840c6d69-38ee-4571-94ad-cb35c56b6ada" />
<img width="1843" height="824" alt="image" src="https://github.com/user-attachments/assets/524ca258-02d7-49b0-ad53-418eab7b192c" />
<img width="1884" height="832" alt="image" src="https://github.com/user-attachments/assets/9c173420-d9db-4064-9773-bbe22212ed65" />

