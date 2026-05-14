import { Link } from 'react-router-dom';

export default function Navbar({ shopPhone }) { // <-- Accept the prop here
  const openWhatsApp = () => {
    // Uses the dynamic phone number from the database!
    window.open(`https://wa.me/${shopPhone}?text=Hello! I have a general inquiry about your sweets.`, '_blank');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold text-orange-600 cursor-pointer">Madhur <span className="text-gray-700">Sweets</span></h1>
        </Link>
        
        <div className="hidden md:flex space-x-6 font-medium items-center">
          <Link to="/" className="hover:text-orange-600 transition">Menu</Link>
          <Link to="/about" className="hover:text-orange-600 transition">About Us</Link>
          <Link to="/admin" target="_blank" className="text-gray-500 hover:text-red-600 text-sm font-bold flex items-center transition">
             Owner Login
          </Link>
        </div>

        <button onClick={openWhatsApp} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition shadow-md">
           Chat Now
        </button>
      </div>
    </nav>
  );
}