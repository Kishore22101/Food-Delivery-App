import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
  }, [location]); // Refresh on location change

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
        <li><Link className={isActive('/')} to="/">Home</Link></li>
        {user && (
          <>
            <li><Link className={isActive('/cart')} to="/cart">Cart</Link></li>
            <li><Link className={isActive('/myorders')} to="/myorders">My Orders</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
        {!user && (
          <>
            <li><Link className={isActive('/login')} to="/login">Login</Link></li>
            <li><Link className={isActive('/register')} to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;