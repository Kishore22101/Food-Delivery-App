// ✅ App.jsx (updated to include BonusTips)
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Cart from './pages/Cart';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyOrders from './pages/MyOrders';
import Navbar from './components/Navbar';
import ProtectedRoute from './routes/ProtectedRoute';
import BonusTips from './components/BonusTips';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Navbar />

        <div className="pt-20 px-4 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/myorders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
          </Routes>

          {/* ✅ Bonus Tips Section */}
          <BonusTips />
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </div>
  );
}

export default App;
