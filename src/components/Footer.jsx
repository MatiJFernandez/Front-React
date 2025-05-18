export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white/90 backdrop-blur shadow-md mt-8 border-t border-blue-100">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              <span className="text-lg font-semibold text-blue-700">Mi App</span>
            </div>
            <p className="text-sm text-gray-500 text-center md:text-left">
              Gestión de productos y usuarios
            </p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-sm text-gray-600">
              <p>© {currentYear} Todos los derechos reservados</p>
              <p className="mt-1">Desarrollado por Matías Fernández</p>
            </div>
            <div className="text-xs text-gray-500">
              <p>Programación III - DSW</p>
              <p>ITEC</p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex gap-4">
              <a 
                href="https://github.com/MatiJFernandez/Front-React" 
                target="_blank" 
                rel="noopener noreferrer"
                className="
                  text-gray-600 hover:text-blue-700 
                  transition-colors p-2 
                  rounded-full hover:bg-blue-50
                  flex items-center gap-2
                  text-sm
                "
                title="Ver código en GitHub"
              >
                <i className="pi pi-github text-xl" />
                <span className="hidden sm:inline">Repositorio</span>
              </a>
              <a 
                href="https://github.com/MatiJFernandez" 
                target="_blank" 
                rel="noopener noreferrer"
                className="
                  text-gray-600 hover:text-blue-700 
                  transition-colors p-2 
                  rounded-full hover:bg-blue-50
                  flex items-center gap-2
                  text-sm
                "
                title="Perfil de GitHub"
              >
                <i className="pi pi-user text-xl" />
                <span className="hidden sm:inline">Perfil</span>
              </a>
            </div>
            <div className="text-xs text-gray-500 text-center md:text-right">
              <p>Versión 1.0.0</p>
              <p className="mt-1">Última actualización: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-blue-100">
          <p className="text-xs text-center text-gray-500">
            Esta aplicación es un proyecto educativo desarrollado como parte de la materia de Programación III.
          </p>
        </div>
      </div>
    </footer>
  );
} 