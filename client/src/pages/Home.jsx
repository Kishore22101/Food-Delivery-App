import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-5 shadow bg-white">
        <div className="text-2xl font-bold flex items-center gap-2">
          <span className="bg-orange-500 text-white p-1 rounded">🍽️</span> EatzUp
        </div>
        <div className="space-x-5">
          <Link to="/" className="hover:text-orange-500 font-semibold">Home</Link>
          <Link to="/menu" className="hover:text-orange-500 font-semibold">Menu</Link>
          <Link to="/contact" className="hover:text-orange-500 font-semibold">Contact</Link>
          <Link to="/orders" className="hover:text-orange-500 font-semibold">Orders</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-1 items-center justify-between p-10 flex-wrap md:flex-nowrap">
        {/* Left Text */}
        <div className="max-w-xl mb-10 md:mb-0">
          <h1 className="text-5xl font-extrabold mb-5 text-gray-800">
            Fast & Fresh <span className="text-orange-500">Food Delivery</span>
          </h1>
          <p className="text-gray-600 mb-5">
            Delivering your favorite meals hot & fresh right at your doorstep. Fast delivery, premium quality.
          </p>
          <div className="space-x-3">
            <Link to="/menu">
              <button className="bg-orange-500 text-white px-5 py-2 rounded-full shadow hover:bg-orange-600">
                Order Now
              </button>
            </Link>
            <button className="bg-white px-5 py-2 rounded-full shadow hover:bg-gray-100 border">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Food Items */}
        <div className="relative w-full md:w-1/2 grid grid-cols-3 gap-4 place-items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" alt="Burger" className="w-16 animate-bounce" />
          <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Pizza" className="w-16 animate-pulse" />
          <img src="https://cdn-icons-png.flaticon.com/512/188/188995.png" alt="Fries" className="w-16 animate-bounce" />
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" alt="Sushi" className="w-16 animate-pulse" />
          <img src="https://cdn-icons-png.flaticon.com/512/3480/3480818.png" alt="Drink" className="w-16 animate-bounce" />
          <img src="https://cdn-icons-png.flaticon.com/512/3075/3075978.png" alt="Donut" className="w-16 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default Home;
