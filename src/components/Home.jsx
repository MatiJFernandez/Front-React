export default function Home() {
  // Array de características principales de la aplicación
  const features = [
    {
      icon: "🛒",
      title: "Gestión de Productos",
      description: "Administra tu catálogo de productos de forma eficiente. Agrega, edita y elimina productos con facilidad."
    },
    {
      icon: "👤",
      title: "Gestión de Usuarios",
      description: "Mantén un registro actualizado de tus usuarios. Gestiona sus datos de manera segura y organizada."
    },
    {
      icon: "📊",
      title: "Exportación a PDF",
      description: "Exporta tus listas de productos y usuarios en formato PDF para mantener un respaldo de la información."
    }
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-6 flex items-center justify-center gap-3">
          <span className="text-4xl sm:text-5xl">🛒</span>
          Bienvenido a Mi App
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
          Una aplicación moderna para gestionar productos y usuarios de manera eficiente.
          Diseñada con las mejores prácticas de desarrollo web y una interfaz intuitiva.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="/productos" 
            className="
              bg-blue-600 hover:bg-blue-700 
              text-white font-semibold 
              py-3 px-6 rounded-lg 
              shadow-lg hover:shadow-xl 
              transition-all duration-300
              flex items-center gap-2
              text-base sm:text-lg
            "
          >
            <i className="pi pi-shopping-cart" />
            Ver Productos
          </a>
          <a 
            href="/usuarios" 
            className="
              bg-green-600 hover:bg-green-700 
              text-white font-semibold 
              py-3 px-6 rounded-lg 
              shadow-lg hover:shadow-xl 
              transition-all duration-300
              flex items-center gap-2
              text-base sm:text-lg
            "
          >
            <i className="pi pi-users" />
            Ver Usuarios
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="
              bg-white rounded-xl shadow-lg 
              p-6 border border-blue-100
              hover:shadow-xl transition-shadow duration-300
              transform hover:-translate-y-1 transition-transform
            "
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Tech Stack Section */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">
          Tecnologías Utilizadas
        </h2>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
          <span className="px-4 py-2 bg-blue-50 rounded-full text-sm font-medium">
            React
          </span>
          <span className="px-4 py-2 bg-blue-50 rounded-full text-sm font-medium">
            Tailwind CSS
          </span>
          <span className="px-4 py-2 bg-blue-50 rounded-full text-sm font-medium">
            PrimeReact
          </span>
          <span className="px-4 py-2 bg-blue-50 rounded-full text-sm font-medium">
            Axios
          </span>
          <span className="px-4 py-2 bg-blue-50 rounded-full text-sm font-medium">
            React Router
          </span>
        </div>
      </div>
    </div>
  );
}
