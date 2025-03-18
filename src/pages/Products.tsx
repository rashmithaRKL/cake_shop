
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product, products, getProductsByCategory } from '../data/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [category, setCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [price, setPrice] = useState<[number, number]>([0, 500]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'birthday', label: 'Birthday Cakes' },
    { value: 'wedding', label: 'Wedding Cakes' },
    { value: 'custom', label: 'Custom Cakes' },
    { value: 'party', label: 'Party Supplies' },
    { value: 'tools', label: 'Baking Tools' },
  ];
  
  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);
  
  useEffect(() => {
    setLoading(true);
    
    // Simulate a slight loading delay for animation
    const timer = setTimeout(() => {
      let result = [...products];
      
      // Filter by category
      if (category && category !== 'all') {
        result = getProductsByCategory(category as Product['category']);
      }
      
      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(
          product => 
            product.name.toLowerCase().includes(term) || 
            product.description.toLowerCase().includes(term) ||
            (product.tags && product.tags.some(tag => tag.toLowerCase().includes(term)))
        );
      }
      
      // Filter by price
      result = result.filter(
        product => product.price >= price[0] && product.price <= price[1]
      );
      
      setFilteredProducts(result);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [category, searchTerm, price]);
  
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    if (newCategory === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', newCategory);
    }
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    setPrice(prev => {
      const newPrice = [...prev] as [number, number];
      newPrice[index] = value;
      return newPrice;
    });
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setPrice([0, 500]);
    setCategory('all');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="bg-cake-50 py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Our Products
            </h1>
            <p className="text-xl text-gray-600 mb-6 animate-fade-in animate-delay-100">
              Explore our collection of delicious cakes, party supplies, and baking tools
            </p>
            
            {/* Search Bar */}
            <div className="relative animate-fade-in animate-delay-200">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 pr-4 w-full rounded-full shadow-sm focus:ring-cake-500 focus:border-cake-500"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-5 gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6 flex justify-between items-center">
              <button 
                onClick={toggleFilters}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
              
              {filteredProducts.length > 0 && (
                <p className="text-gray-500 text-sm">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
              )}
            </div>
            
            {/* Filters Sidebar */}
            <div className={`lg:col-span-1 space-y-8 ${showFilters ? 'block' : 'hidden'} lg:block animate-fade-in`}>
              <div className="lg:sticky lg:top-24">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-cake-600 hover:text-cake-700 inline-flex items-center"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear all
                  </button>
                </div>
                
                {/* Categories */}
                <div className="mb-8">
                  <h3 className="text-md font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => handleCategoryChange(cat.value)}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          category === cat.value
                            ? 'bg-cake-100 text-cake-800 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h3 className="text-md font-medium mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">${price[0]}</span>
                      <span className="text-sm text-gray-500">${price[1]}</span>
                    </div>
                    
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={price[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cake-500"
                    />
                  </div>
                </div>
                
                {/* Mobile Close Button */}
                <div className="mt-8 lg:hidden">
                  <button
                    onClick={toggleFilters}
                    className="w-full bg-cake-500 text-white py-2 rounded-md hover:bg-cake-600 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
            
            {/* Products */}
            <div className="lg:col-span-4">
              {/* Results count - Desktop */}
              <div className="hidden lg:flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">
                  {category === 'all' ? 'All Products' : categories.find(c => c.value === category)?.label}
                </h2>
                
                {filteredProducts.length > 0 && (
                  <p className="text-gray-500">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </p>
                )}
              </div>
              
              {loading ? (
                // Loading State
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="glass-card animate-pulse">
                      <div className="aspect-[4/3] rounded-lg bg-gray-200 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                      <div className="h-10 bg-gray-200 rounded-full"></div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                // Products Grid
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <div 
                      key={product.id} 
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                // No Results
                <div className="text-center py-16 glass-card">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <button 
                    onClick={clearFilters}
                    className="bg-cake-500 hover:bg-cake-600 text-white py-2 px-6 rounded-full inline-flex items-center justify-center transition-all duration-300 text-sm font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
