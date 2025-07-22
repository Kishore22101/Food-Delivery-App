import Hero from '../components/Hero';
import Offers from '../components/Offers';

function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <Hero />
      <Offers />
      
      <h2>🍔 Welcome to EatzUp Home Page</h2>
      <p>Explore our delicious menu and amazing offers!</p>

    </div>
  );
}

export default Home;