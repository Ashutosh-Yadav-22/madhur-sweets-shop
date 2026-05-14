import { Link } from 'react-router-dom';

export default function Footer() {
  
  // Smart scroll function
  const handleMenuClick = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      // If the user is on the Home page, smoothly scroll to the menu
      menuSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If the user is on the About page, navigate back to the Home page
      window.location.href = "/";
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t-4 border-orange-500 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <div>
          <h4 className="text-2xl font-bold text-orange-500 mb-4">Madhur Sweets</h4>
          <p className="text-slate-400">Serving authentic taste since 1995. Quality and hygiene is our priority.</p>
        </div>
        
        <div>
          <h4 className="text-xl font-bold mb-4 text-white">Visit Us</h4>
          <p className="text-slate-400">Main Bazaar, Opp. Town Hall,<br/>Modasa, Gujarat - 383315</p>
        </div>
        
        <div>
          <h4 className="text-xl font-bold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-3 text-slate-400">
            {/* The fixed link button */}
            <li>
              <button onClick={handleMenuClick} className="hover:text-orange-400 transition font-medium">
                Full Menu
              </button>
            </li>
            {/* Added link to the new About Us page */}
            <li>
              <Link to="/about" className="hover:text-orange-400 transition font-medium">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        
      </div>
      <div className="text-center mt-12 pt-8 border-t border-slate-800 text-slate-500">
        &copy; 2026 Madhur Sweets. Developed by Ashutosh Yadav.
      </div>
    </footer>
  );
}