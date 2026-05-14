export default function About() {
  return (
    <div className="bg-orange-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-orange-600 mb-4">Our Heritage</h2>
          <p className="text-xl text-gray-600">Serving sweetness and smiles since 1995.</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-2xl shadow-xl">
          
          <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
            <p>
              <strong className="text-orange-600 text-2xl font-bold block mb-2">How It All Started</strong>
              What began as a small, humble kitchen in the heart of Modasa, Gujarat, has now grown into a beloved landmark for authentic sweets and namkeen. Founded by the visionary shopkeeper, our mission has always been simple: never compromise on quality.
            </p>
            <p>
              Every piece of Kaju Katli, every crispy Gathiya, and every festive hamper is crafted using traditional family recipes passed down through generations. We source only the purest ghee, the finest dry fruits, and the freshest local ingredients.
            </p>
            <div className="bg-orange-100 p-6 rounded-xl border-l-4 border-orange-500 mt-8">
              <h4 className="font-bold text-gray-900 text-xl mb-2">Our Promise</h4>
              <p className="text-gray-700">"We don't just sell sweets; we deliver happiness for your most precious celebrations."</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1589113093348-18e4bc392d43?auto=format&fit=crop&q=80&w=400" alt="Making Sweets" className="rounded-xl shadow-md w-full h-48 object-cover transform hover:scale-105 transition duration-500" />
            <img src="https://images.unsplash.com/photo-1548946522-4a313e8972a4?auto=format&fit=crop&q=80&w=400" alt="Fresh Sweets" className="rounded-xl shadow-md w-full h-48 object-cover transform hover:scale-105 transition duration-500 mt-8" />
          </div>

        </div>

        {/* Timeline / Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-orange-500">
            <h3 className="text-4xl font-black text-gray-800 mb-2">1995</h3>
            <p className="text-gray-600 font-medium">The Year We Opened</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-orange-500">
            <h3 className="text-4xl font-black text-gray-800 mb-2">100%</h3>
            <p className="text-gray-600 font-medium">Pure Desi Ghee Used</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-orange-500">
            <h3 className="text-4xl font-black text-gray-800 mb-2">50+</h3>
            <p className="text-gray-600 font-medium">Varieties of Delicacies</p>
          </div>
        </div>

      </div>
    </div>
  );
}