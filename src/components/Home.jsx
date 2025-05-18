import { motion } from 'framer-motion';

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

  // Variantes de animación para las cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-12 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold text-blue-700 mb-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.span 
            className="text-4xl sm:text-5xl"
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
          >
            🛒
          </motion.span>
          Bienvenido a Mi App
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Una aplicación moderna para gestionar productos y usuarios de manera eficiente.
          Diseñada con las mejores prácticas de desarrollo web y una interfaz intuitiva.
        </motion.p>
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.a 
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="pi pi-shopping-cart" />
            Ver Productos
          </motion.a>
          <motion.a 
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="pi pi-users" />
            Ver Usuarios
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="
              bg-white rounded-xl shadow-lg 
              p-6 border border-blue-100
              hover:shadow-xl transition-shadow duration-300
            "
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={index}
          >
            <motion.div 
              className="text-4xl mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {feature.icon}
            </motion.div>
            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack Section */}
      <motion.div 
        className="mt-16 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-2xl font-semibold text-blue-700 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Tecnologías Utilizadas
        </motion.h2>
        <motion.div 
          className="flex flex-wrap justify-center gap-4 text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {["React", "Tailwind CSS", "PrimeReact", "Axios", "React Router"].map((tech, index) => (
            <motion.span 
              key={tech}
              className="px-4 py-2 bg-blue-50 rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * index }}
              whileHover={{ scale: 1.05, backgroundColor: "#EBF5FF" }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
