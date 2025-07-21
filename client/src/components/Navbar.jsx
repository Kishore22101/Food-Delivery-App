import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h1>Food Delivery App</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
