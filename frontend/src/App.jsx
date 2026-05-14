import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import AdminPanel from './components/AdminPanel';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  const [products, setProducts] = useState([]);
  const [shopPhone, setShopPhone] = useState("919510936360"); // Default fallback

  const fetchData = async () => {
      try {
        // 🟢 Added the same fallback here so your menu items will load!
        const API_BASE = import.meta.env.VITE_API_URL || 'https://madhur-backend.onrender.com/api';
        
        const productRes = await axios.get(`${API_BASE}/products`);
        setProducts(productRes.data);
        
        const phoneRes = await axios.get(`${API_BASE}/admin/phone`);
        if (phoneRes.data.phone) {
          setShopPhone(phoneRes.data.phone);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-orange-50 text-gray-800 font-sans min-h-screen flex flex-col">
        {/* Pass the phone number to the Navbar */}
        <Navbar shopPhone={shopPhone} />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                {/* Pass the phone number to the Menu */}
                <Menu products={products} shopPhone={shopPhone} />
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={
              <AdminPanel products={products} fetchProducts={fetchData} />
            } />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;