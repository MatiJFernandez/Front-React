import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  const linkClass = (path) =>
    `relative px-4 py-2 rounded-md font-semibold transition-colors duration-200
    ${pathname === path ? 'bg-blue-600 text-white shadow' : 'text-blue-700 hover:bg-blue-100 hover:text-blue-900'}
    after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300
    hover:after:w-2/3`;

  return (
    <nav className="w-full bg-white/90 backdrop-blur shadow-md mb-8 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <span className="text-2xl font-extrabold text-blue-700 tracking-tight drop-shadow">Mi App</span>
        <div className="flex gap-2">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/productos" className={linkClass('/productos')}>Productos</Link>
          <Link to="/usuarios" className={linkClass('/usuarios')}>Usuarios</Link>
        </div>
      </div>
    </nav>
  );
}
