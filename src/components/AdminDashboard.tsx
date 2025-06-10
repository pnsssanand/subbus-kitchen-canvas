
import { useState, FormEvent, ChangeEvent } from 'react';
import { useAuth, useMenuItems } from '../firebase/hooks';
import { MenuItem } from '../types/menu';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { menuItems, loading, addMenuItem, updateMenuItem, deleteMenuItem } = useMenuItems();
  
  // Form state
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSpecial, setIsSpecial] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Categories management
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  
  // Filter state
  const [filterCategory, setFilterCategory] = useState('all');

  // Initialize categories from menu items
  useState(() => {
    if (menuItems.length > 0) {
      const uniqueCategories = Array.from(new Set(menuItems.map(item => item.category)));
      setCategories(uniqueCategories);
    }
  });

  const resetForm = () => {
    setFormMode('add');
    setCurrentItemId(null);
    setName('');
    setPrice('');
    setCategory('');
    setDescription('');
    setImageUrl('');
    setIsSpecial(false);
  };

  const handleEditItem = (item: MenuItem) => {
    setFormMode('edit');
    setCurrentItemId(item.id);
    setName(item.name);
    setPrice(item.price.toString());
    setCategory(item.category);
    setDescription(item.description || '');
    setImageUrl(item.imageUrl || '');
    setIsSpecial(item.isSpecial || false);
    
    // Scroll to the form
    document.getElementById('menuForm')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteItem = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteMenuItem(id);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const menuItem = {
        name,
        price: Number(price),
        category,
        description: description || undefined,
        imageUrl: imageUrl || undefined,
        isSpecial
      };

      if (formMode === 'add') {
        await addMenuItem(menuItem);
        resetForm();
      } else if (formMode === 'edit' && currentItemId) {
        await updateMenuItem(currentItemId, menuItem);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving menu item:', error);
      toast.error('Failed to save menu item');
    } finally {
      setFormLoading(false);
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'subu foods');
    
    setFormLoading(true);
    toast.info('Uploading image...');

    fetch('https://api.cloudinary.com/v1_1/diiumf2qw/image/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      setImageUrl(data.secure_url);
      toast.success('Image uploaded successfully');
    })
    .catch(error => {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    })
    .finally(() => setFormLoading(false));
  };

  const filteredMenuItems = filterCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === filterCategory);

  return (
    <div className="min-h-screen bg-restaurant-black">
      {/* Header */}
      <header className="bg-restaurant-dark shadow-lg py-4">
        <div className="container-custom flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="text-restaurant-yellow">gemini's foods</span> Admin
          </h1>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-gray-400">
              Logged in as: {currentUser?.email}
            </span>
            <button 
              onClick={logout}
              className="px-4 py-2 bg-restaurant-gray hover:bg-opacity-80 rounded-md transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Form */}
          <div className="lg:col-span-1">
            <div className="bg-restaurant-dark rounded-lg shadow-lg p-6" id="menuForm">
              <h2 className="text-xl font-bold mb-4">
                {formMode === 'add' ? 'Add New Menu Item' : 'Edit Menu Item'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Item Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-restaurant-gray bg-opacity-50 rounded border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-restaurant-yellow"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-restaurant-gray bg-opacity-50 rounded border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-restaurant-yellow"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                    Category *
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-restaurant-gray bg-opacity-50 rounded border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-restaurant-yellow"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Add new category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="flex-grow bg-restaurant-gray bg-opacity-50 rounded border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-restaurant-yellow"
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="px-3 py-2 bg-restaurant-yellow text-restaurant-black rounded hover:bg-opacity-90"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-restaurant-gray bg-opacity-50 rounded border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-restaurant-yellow"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">
                    Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="imageUrl"
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full bg-restaurant-gray bg-opacity-50 rounded border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-restaurant-yellow"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-300 mb-1">
                    Upload Image
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full bg-restaurant-gray bg-opacity-50 rounded border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-restaurant-yellow"
                  />
                </div>

                {imageUrl && (
                  <div className="mt-2">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="h-32 object-cover rounded border border-gray-700"
                    />
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    id="isSpecial"
                    type="checkbox"
                    checked={isSpecial}
                    onChange={(e) => setIsSpecial(e.target.checked)}
                    className="h-4 w-4 text-restaurant-yellow focus:ring-restaurant-yellow border-gray-700 rounded"
                  />
                  <label htmlFor="isSpecial" className="ml-2 block text-sm text-gray-300">
                    Mark as Today's Special
                  </label>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-grow btn-primary py-2"
                  >
                    {formLoading ? 'Saving...' : formMode === 'add' ? 'Add Item' : 'Update Item'}
                  </button>
                  {formMode === 'edit' && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 bg-restaurant-gray hover:bg-opacity-80 rounded-md transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Menu Items List */}
          <div className="lg:col-span-2">
            <div className="bg-restaurant-dark rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Menu Items</h2>

              {/* Filter */}
              <div className="mb-4">
                <label htmlFor="filterCategory" className="block text-sm font-medium text-gray-300 mb-1">
                  Filter by Category
                </label>
                <select
                  id="filterCategory"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full bg-restaurant-gray bg-opacity-50 rounded border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-restaurant-yellow"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin h-8 w-8 border-4 border-restaurant-yellow border-t-transparent rounded-full"></div>
                  <p className="mt-2 text-gray-400">Loading menu items...</p>
                </div>
              ) : filteredMenuItems.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  {filterCategory === 'all' 
                    ? 'No menu items found. Add your first item using the form.'
                    : 'No items found in this category.'}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-700">
                        <th className="pb-2">Name</th>
                        <th className="pb-2">Price</th>
                        <th className="pb-2">Category</th>
                        <th className="pb-2">Special</th>
                        <th className="pb-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMenuItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-800">
                          <td className="py-3">{item.name}</td>
                          <td className="py-3">₹{item.price}</td>
                          <td className="py-3">{item.category}</td>
                          <td className="py-3">
                            {item.isSpecial ? (
                              <span className="px-2 py-1 bg-restaurant-yellow text-restaurant-black text-xs rounded-full">
                                Special
                              </span>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditItem(item)}
                                className="p-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="p-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
