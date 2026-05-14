import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPanel({ products, fetchProducts }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSetupNeeded, setIsSetupNeeded] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [formData, setFormData] = useState({ name: '', category: 'Sweets', price: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [editPriceId, setEditPriceId] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  const [updateData, setUpdateData] = useState({ currentPassword: '', newPhone: '', newPassword: '' });

  useEffect(() => {
    const checkAdminSetup = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/check');
        setIsSetupNeeded(!res.data.isSetup);
      } catch (err) {
        console.error("Error checking admin status", err);
      }
    };
    checkAdminSetup();
  }, []);

  const handleSetupAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/setup', { phone: phoneInput, password: passwordInput });
      alert("Account Setup Successful! You are now logged in.");
      setIsSetupNeeded(false);
      setIsAuthenticated(true);
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { phone: phoneInput, password: passwordInput });
      if (res.data.success) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      alert("Incorrect Phone Number or Password!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPhoneInput("");
    setPasswordInput("");
    setUpdateData({ currentPassword: '', newPhone: '', newPassword: '' });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('description', formData.description);
    if (imageFile) data.append('image', imageFile);

    try {
      await axios.post('http://localhost:5000/api/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Product Added Successfully!');
      fetchProducts();
      setFormData({ name: '', category: 'Sweets', price: '', description: '' });
      setImageFile(null);
      document.getElementById("file-upload").value = ""; 
    } catch (err) {
      alert('Error adding product');
    }
  };

  const updatePrice = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, { price: newPrice });
      setEditPriceId(null);
      setNewPrice("");
      fetchProducts();
    } catch (err) {
      alert('Error updating price');
    }
  };

  const deleteProduct = async (id) => {
    if(window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert("Error deleting product");
      }
    }
  };

  const handleUpdateCredentials = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/admin/update', updateData);
      if (res.data.success) {
        alert("Settings Updated! Please log in again with your new credentials.");
        handleLogout(); 
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error updating credentials");
    }
  };

  if (!isAuthenticated && isSetupNeeded) {
    return (
      <section className="bg-slate-800 flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <div className="bg-slate-700 p-8 rounded-xl shadow-2xl border border-slate-600 max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-green-400">First-Time Setup</h2>
            <p className="text-slate-300 mt-2">Create your shopkeeper account to begin.</p>
          </div>
          <form onSubmit={handleSetupAccount} className="space-y-4">
            <input type="tel" required placeholder="Phone Number" 
              className="w-full p-4 bg-slate-800 text-white rounded-lg focus:ring-2 focus:ring-green-500 outline-none border border-slate-600"
              value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} />
            <input type="password" required placeholder="Create Password" 
              className="w-full p-4 bg-slate-800 text-white rounded-lg focus:ring-2 focus:ring-green-500 outline-none border border-slate-600"
              value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
            <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition shadow-lg">
              Set Up & Unlock
            </button>
          </form>
        </div>
      </section>
    );
  }

  if (!isAuthenticated && !isSetupNeeded) {
    return (
      <section className="bg-slate-800 flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <div className="bg-slate-700 p-8 rounded-xl shadow-2xl border border-slate-600 max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-orange-400">Owner Login</h2>
            <p className="text-slate-400 mt-2">Enter credentials to manage Madhur Sweets.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="tel" required placeholder="Phone Number" 
              className="w-full p-4 bg-slate-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none border border-slate-600"
              value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} />
            <input type="password" required placeholder="Password" 
              className="w-full p-4 bg-slate-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none border border-slate-600"
              value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-800 text-white py-12 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 border-b border-slate-600 pb-4 flex justify-between items-center">
            <div>
                <h2 className="text-3xl font-bold text-orange-400">Owner Dashboard</h2>
                <p className="text-slate-400 mt-2">Update your menu and shop settings.</p>
            </div>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition shadow">
                Lock / Logout
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-700 p-8 rounded-xl shadow-2xl border border-slate-600">
            <h3 className="text-xl font-bold mb-6 border-l-4 border-green-500 pl-3">Add New Item</h3>
            <form onSubmit={handleAddProduct} className="space-y-5">
              <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Item Name</label>
                  <input type="text" placeholder="e.g. Kaju Katli" required 
                    className="w-full p-3 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                    <select className="w-full p-3 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none shadow-inner" 
                            value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                      <option value="Sweets">Sweets</option>
                      <option value="Namkeen">Namkeen</option>
                      <option value="Snacks">Snacks</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Price (₹)</label>
                    <input type="number" placeholder="per kg" required
                      className="w-full p-3 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"
                      value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                </div>
              </div>
              <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                  <input type="text" placeholder="Ingredients or taste description" required
                    className="w-full p-3 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"
                    value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>
              <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Upload Photo</label>
                  <input type="file" id="file-upload" accept="image/*" required
                    className="w-full p-2 bg-slate-600 text-white rounded-lg border border-slate-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    onChange={(e) => setImageFile(e.target.files[0])} />
              </div>
              <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-600 transition shadow-lg">
                  + Add to Menu
              </button>
            </form>
          </div>

          <div className="bg-slate-700 p-8 rounded-xl shadow-2xl border border-slate-600 h-fit max-h-[600px] overflow-y-auto">
            <h3 className="text-xl font-bold mb-6 border-l-4 border-blue-500 pl-3">Current Menu</h3>
            {products.length === 0 ? (
                <p className="text-slate-400 italic">No items found.</p>
            ) : (
                <div className="space-y-4">
                {products.map(product => (
                <div key={product._id} className="bg-slate-800 p-4 rounded-lg flex justify-between items-center shadow border border-slate-600">
                    <div>
                        <h4 className="font-bold text-orange-400 text-lg">{product.name}</h4>
                        {editPriceId === product._id ? (
                            <div className="flex space-x-2 mt-2">
                                <input type="number" className="w-24 p-2 bg-white text-gray-900 rounded focus:outline-none"
                                    value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                                <button onClick={() => updatePrice(product._id)} className="bg-green-500 text-white px-3 rounded font-bold">Save</button>
                                <button onClick={() => setEditPriceId(null)} className="bg-slate-500 text-white px-3 rounded">X</button>
                            </div>
                        ) : (
                            <p className="text-slate-300 font-medium">₹{product.price}/kg</p>
                        )}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <button onClick={() => setEditPriceId(product._id)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-600">Edit Price</button>
                        <button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-600">Delete</button>
                    </div>
                </div>
                ))}
                </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-slate-700 p-8 rounded-xl shadow-2xl border border-slate-600">
          <h3 className="text-xl font-bold mb-6 border-l-4 border-orange-500 pl-3">Account Settings</h3>
          <form onSubmit={handleUpdateCredentials} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Update Phone Number</label>
              <input type="tel" placeholder="New Phone"
                className="w-full p-3 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"
                value={updateData.newPhone} onChange={(e) => setUpdateData({...updateData, newPhone: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Update Password</label>
              <input type="password" placeholder="New Password"
                className="w-full p-3 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"
                value={updateData.newPassword} onChange={(e) => setUpdateData({...updateData, newPassword: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-red-400 mb-1 italic font-bold">Current Password *</label>
              <div className="flex gap-2">
                <input type="password" required placeholder="Required to save"
                  className="flex-grow p-3 bg-slate-100 text-gray-900 rounded-lg focus:ring-2 focus:ring-red-500 outline-none font-bold"
                  value={updateData.currentPassword} onChange={(e) => setUpdateData({...updateData, currentPassword: e.target.value})} />
                <button type="submit" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg">
                  Update
                </button>
              </div>
            </div>
          </form>
          <p className="text-slate-400 text-xs mt-4 italic font-medium">Note: After updating, you will be logged out to verify your new credentials.</p>
        </div>

      </div>
    </section>
  );
}