import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Variantes para las secciones del footer
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.footer 
      className="w-full bg-white/90 backdrop-blur shadow-md mt-8 border-t border-blue-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Logo y descripción */}
          <motion.div 
            className="flex flex-col items-center md:items-start gap-2"
            custom={0}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span 
                className="text-2xl"
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                🛒
              </motion.span>
              <motion.span 
                className="text-lg font-semibold text-blue-700"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Mi App
              </motion.span>
            </motion.div>
            <motion.p 
              className="text-sm text-gray-500 text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Gestión de productos y usuarios
            </motion.p>
          </motion.div>
          
          {/* Información de copyright */}
          <motion.div 
            className="text-center space-y-2"
            custom={1}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="text-sm text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p>© {currentYear} Todos los derechos reservados</p>
              <motion.p 
                className="mt-1"
                whileHover={{ scale: 1.05, color: "#1D4ED8" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Desarrollado por Matías Fernández
              </motion.p>
            </motion.div>
            <motion.div 
              className="text-xs text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p>Programación III - DSW</p>
              <p>ITEC</p>
            </motion.div>
          </motion.div>

          {/* Enlaces y versión */}
          <motion.div 
            className="flex flex-col items-center md:items-end gap-3"
            custom={2}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.a 
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
                whileHover={{ scale: 1.1, backgroundColor: "#EBF5FF" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.i 
                  className="pi pi-github text-xl"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <span className="hidden sm:inline">Repositorio</span>
              </motion.a>
              <motion.a 
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
                whileHover={{ scale: 1.1, backgroundColor: "#EBF5FF" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.i 
                  className="pi pi-user text-xl"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <span className="hidden sm:inline">Perfil</span>
              </motion.a>
            </motion.div>
            <motion.div 
              className="text-xs text-gray-500 text-center md:text-right"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <p>Versión 1.0.0</p>
              <motion.p 
                className="mt-1"
                whileHover={{ scale: 1.05, color: "#4B5563" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Última actualización: {new Date().toLocaleDateString()}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-6 pt-4 border-t border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.p 
            className="text-xs text-center text-gray-500"
            whileHover={{ scale: 1.02, color: "#4B5563" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Esta aplicación es un proyecto educativo desarrollado como parte de la materia de Programación III.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
} 