import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cart', path: '/cart' },
    { name: 'My Orders', path: '/myorders' },
  ];

  return (
    <nav className="bg-black text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-yellow-400 tracking-wide">
          EatzUp 🍔
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                (isActive
                  ? 'text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1'
                  : 'hover:text-yellow-300 transition') + ' px-2'
              }
            >
              {link.name}
            </NavLink>
          ))}
          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className="hover:text-yellow-300 px-2">Login</NavLink>
              <NavLink to="/register" className="hover:text-yellow-300 px-2">Register</NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="hover:text-red-400 px-2">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black px-4 pb-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  (isActive
                    ? 'text-yellow-400 font-semibold'
                    : 'hover:text-yellow-300 transition') + ' px-2'
                }
              >
                {link.name}
              </NavLink>
            ))}
            {!isLoggedIn ? (
              <>
                <NavLink to="/login" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 px-2">Login</NavLink>
                <NavLink to="/register" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300 px-2">Register</NavLink>
              </>
            ) : (
              <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="hover:text-red-400 px-2">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
