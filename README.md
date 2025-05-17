# Front-React - Sistema de Gestión de Usuarios y Productos

Este proyecto es una aplicación web desarrollada con React y Vite que permite gestionar usuarios y productos. Utiliza una API REST para la comunicación con el backend y está construida con tecnologías modernas como React Router, PrimeReact para la interfaz de usuario, y Tailwind CSS para los estilos.

## 🚀 Características

- Gestión de usuarios (crear, leer, actualizar, eliminar)
- Gestión de productos (crear, leer, actualizar, eliminar)
- Interfaz de usuario moderna y responsiva
- Navegación intuitiva
- Notificaciones en tiempo real
- Diseño adaptable a diferentes dispositivos

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18.0.0 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- Un editor de código (recomendamos [Visual Studio Code](https://code.visualstudio.com/))
- Git para el control de versiones

## 🔧 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/MatiJFernandez/Front-React.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd Front-React
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

## 🚀 Ejecución del Proyecto

1. Para iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

2. Para construir la versión de producción:
   ```bash
   npm run build
   ```

3. Para previsualizar la versión de producción:
   ```bash
   npm run preview
   ```

## 🛠️ Tecnologías Utilizadas

- [React](https://reactjs.org/) - Biblioteca JavaScript para construir interfaces de usuario
- [Vite](https://vitejs.dev/) - Herramienta de construcción frontend moderna
- [React Router](https://reactrouter.com/) - Enrutamiento para aplicaciones React
- [PrimeReact](https://primereact.org/) - Biblioteca de componentes UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitario
- [Axios](https://axios-http.com/) - Cliente HTTP
- [React Toastify](https://fkhadra.github.io/react-toastify/) - Sistema de notificaciones

## 📁 Estructura del Proyecto

```
Front-React/
├── public/              # Archivos estáticos
├── src/                 # Código fuente
│   ├── assets/         # Imágenes y recursos estáticos
│   │   ├── Products/   # Componentes relacionados con productos
│   │   └── Users/      # Componentes relacionados con usuarios
│   ├── App.jsx         # Componente principal
│   └── main.jsx        # Punto de entrada
├── .gitignore          # Archivos ignorados por git
├── package.json        # Dependencias y scripts
├── vite.config.js      # Configuración de Vite
└── tailwind.config.js  # Configuración de Tailwind CSS
```

## 🔍 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la versión de producción
- `npm run lint` - Ejecuta el linter para verificar el código

## 📝 Notas Importantes

- Asegúrate de que el backend esté corriendo antes de iniciar la aplicación
- La aplicación está configurada para conectarse a `http://localhost:3000` por defecto
- Si necesitas cambiar la URL del backend, modifica la configuración en los archivos correspondientes


## ✨ Autor

- Matías Fernández - [GitHub](https://github.com/MatiJFernandez)
