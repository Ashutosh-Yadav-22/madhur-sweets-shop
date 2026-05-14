import { useState } from 'react';

export default function Menu({ products, shopPhone }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // State for the search bar
  const categories = ["All", "Sweets", "Namkeen", "Snacks"];

  // Advanced Filter: Checks BOTH Category AND Search Query (FIXED: Added Array.isArray check)
  const filteredProducts = Array.isArray(products) ? products.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) : [];

  const orderProduct = (product) => {
    // Uses the dynamic phone number from the database!
    const msg = encodeURIComponent(`Hello! I'd like to order:\n\n*Item:* ${product.name}\n*Price:* ₹${product.price}/kg\n\nPlease let me know availability.`);
    window.open(`https://wa.me/${shopPhone}?text=${msg}`, '_blank');
  };

  return (
    <section id="menu" className="py-16 container mx-auto px-4">
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h3 className="text-3xl font-bold border-l-4 border-orange-600 pl-4 w-full md:w-auto">Our Menu</h3>
        
        {/* The New Search Bar */}
        <div className="w-full md:w-1/3">
          <input 
            type="text" 
            placeholder="Search sweets or ingredients..." 
            className="w-full p-3 rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Buttons */}
        <div className="flex space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border border-orange-600 font-medium whitespace-nowrap transition ${selectedCategory === cat ? 'bg-orange-600 text-white shadow-md' : 'bg-white text-orange-600 hover:bg-orange-50'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg">
          No items found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:-translate-y-2 transition duration-300 border border-orange-50">
              <div className="h-48 overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition duration-500" />
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">{product.category}</span>
                <h4 className="text-xl font-bold mt-1 mb-2 text-gray-800">{product.name}</h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-xl font-black text-gray-900">₹{product.price}<span className="text-sm font-normal text-gray-500">/kg</span></span>
                  <button onClick={() => orderProduct(product)} className="bg-green-500 text-white px-4 py-2 rounded-full font-bold hover:bg-green-600 hover:shadow-lg transition">
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}