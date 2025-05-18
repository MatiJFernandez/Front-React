import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

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

  return (
    <nav className="w-full bg-white/90 backdrop-blur shadow-md mb-8 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-extrabold text-blue-700 tracking-tight drop-shadow flex items-center gap-2">
            <span className="text-3xl">🛒</span> Mi App
          </span>
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
          >
            <i className={`pi ${isMenuOpen ? 'pi-times' : 'pi-bars'} text-xl text-blue-700`} />
          </button>
          <div className={`
            absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent
            shadow-lg md:shadow-none border-t md:border-0 border-blue-100
            ${isMenuOpen ? 'block' : 'hidden'} md:block
            transition-all duration-300 ease-in-out
          `}>
            <div className="flex flex-col md:flex-row items-center gap-2 p-4 md:p-0">
              <Link 
                to="/" 
                className={`${linkClass('/')} w-full md:w-auto text-center`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/productos" 
                className={`${linkClass('/productos')} w-full md:w-auto text-center`}
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link 
                to="/usuarios" 
                className={`${linkClass('/usuarios')} w-full md:w-auto text-center`}
                onClick={() => setIsMenuOpen(false)}
              >
                Usuarios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
