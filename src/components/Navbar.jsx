import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const linkClass = (path) =>
    `relative px-4 py-2 rounded-md font-semibold transition-colors duration-200
    ${pathname === path ? 'bg-blue-600 text-white shadow' : 'text-blue-700 hover:bg-blue-100 hover:text-blue-900'}
    after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300
    hover:after:w-2/3`;

  // Variantes para el menú móvil
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      display: "none",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        display: { delay: 0.3 }
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      display: "block",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        display: { delay: 0 }
      }
    }
  };

  // Variantes para los enlaces del menú
  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.nav 
      className="w-full bg-white/90 backdrop-blur shadow-md mb-8 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.span 
              className="text-3xl"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              🛒
            </motion.span>
            <motion.span 
              className="text-2xl font-extrabold text-blue-700 tracking-tight drop-shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Mi App
            </motion.span>
          </motion.div>

          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.i 
              className={`pi ${isMenuOpen ? 'pi-times' : 'pi-bars'} text-xl text-blue-700`}
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* Menú de navegación */}
          <div className="hidden md:flex md:flex-row md:items-center md:gap-2">
            {[
              { path: '/', label: 'Home' },
              { path: '/productos', label: 'Productos' },
              { path: '/usuarios', label: 'Usuarios' }
            ].map((link, i) => (
              <motion.div
                key={link.path}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={link.path} 
                  className={`${linkClass(link.path)} text-center block`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Menú móvil */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="
                  absolute top-full left-0 right-0 
                  bg-white shadow-lg border-t border-blue-100
                  md:hidden
                "
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <motion.div 
                  className="flex flex-col items-center gap-2 p-4"
                >
                  {[
                    { path: '/', label: 'Home' },
                    { path: '/productos', label: 'Productos' },
                    { path: '/usuarios', label: 'Usuarios' }
                  ].map((link, i) => (
                    <motion.div
                      key={link.path}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full"
                    >
                      <Link 
                        to={link.path} 
                        className={`${linkClass(link.path)} w-full text-center block`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
