export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white/90 backdrop-blur shadow-md mt-8 border-t border-blue-100">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <span className="text-lg font-semibold text-blue-700">Mi App</span>
          </div>
          
          <div className="text-sm text-gray-600 text-center">
            <p>© {currentYear} Todos los derechos reservados</p>
            <p className="mt-1">Desarrollado por Matías Fernández</p>
          </div>

          <div className="flex gap-4">
            <a 
              href="https://github.com/MatiJFernandez/Front-React" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition-colors"
              title="Ver código en GitHub"
            >
              <i className="pi pi-github text-xl" />
            </a>
            <a 
              href="https://github.com/MatiJFernandez" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition-colors"
              title="Perfil de GitHub"
            >
              <i className="pi pi-user text-xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 