
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, CheckCircle, Heart, Share2 } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  
  const product = id ? getProductById(id) : null;
  const relatedProducts = id ? getRelatedProducts(id) : [];
  
  useEffect(() => {
    // Reset scroll position when product changes
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!product) {
    return (
      <div className="pt-24 min-h-screen container mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/products" 
          className="bg-cake-500 hover:bg-cake-600 text-white py-2 px-6 rounded-full inline-flex items-center justify-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    setAdding(true);
    
    // Add multiple quantities
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    
    setTimeout(() => {
      setAdding(false);
    }, 1000);
  };
  
  return (
    <div className="pt-16 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-cake-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-500">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link to="/" className="hover:text-cake-600 transition-colors">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link to="/products" className="hover:text-cake-600 transition-colors">Products</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link 
                  to={`/products?category=${product.category}`} 
                  className="hover:text-cake-600 transition-colors capitalize"
                >
                  {product.category}
                </Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-700 font-medium truncate">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>
      
      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <div className="glass-card p-4 rounded-2xl animate-fade-in">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto object-cover" 
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="animate-fade-in animate-delay-100">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-semibold text-cake-700">${product.price.toFixed(2)}</span>
                {product.bestSeller && (
                  <span className="ml-4 bg-cake-100 text-cake-800 text-xs px-2.5 py-1 rounded-full capitalize">
                    Best Seller
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-8">{product.description}</p>
              
              {/* Add to Cart */}
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <span className="mr-4 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-full">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="py-1 px-3 text-gray-500 hover:text-cake-500 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="py-1 px-3 text-gray-500 hover:text-cake-500 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleAddToCart}
                    disabled={adding}
                    className="bg-cake-500 hover:bg-cake-600 disabled:bg-cake-300 text-white py-3 px-8 rounded-full inline-flex items-center justify-center transition-all duration-300 text-lg font-medium w-full sm:w-auto"
                  >
                    {adding ? (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5 animate-scale-in" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  
                  <button className="border border-gray-300 hover:border-cake-300 text-gray-700 py-3 px-8 rounded-full inline-flex items-center justify-center transition-all duration-300 text-lg font-medium w-full sm:w-auto">
                    <Heart className="mr-2 h-5 w-5" />
                    Save
                  </button>
                </div>
              </div>
              
              {/* Product Info Tabs */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex border-b border-gray-200 mb-6">
                  <button 
                    onClick={() => setActiveTab('description')}
                    className={`py-2 px-4 font-medium text-sm -mb-px ${
                      activeTab === 'description' 
                        ? 'border-b-2 border-cake-500 text-cake-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Details
                  </button>
                  <button 
                    onClick={() => setActiveTab('ingredients')}
                    className={`py-2 px-4 font-medium text-sm -mb-px ${
                      activeTab === 'ingredients' 
                        ? 'border-b-2 border-cake-500 text-cake-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Ingredients
                  </button>
                  <button 
                    onClick={() => setActiveTab('shipping')}
                    className={`py-2 px-4 font-medium text-sm -mb-px ${
                      activeTab === 'shipping' 
                        ? 'border-b-2 border-cake-500 text-cake-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Shipping
                  </button>
                </div>
                
                <div className="text-gray-600">
                  {activeTab === 'description' && (
                    <div className="space-y-4 animate-fade-in">
                      <p>{product.description}</p>
                      {product.dimensions && (
                        <p><span className="font-medium">Dimensions:</span> {product.dimensions}</p>
                      )}
                      {product.weight && (
                        <p><span className="font-medium">Weight:</span> {product.weight}</p>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'ingredients' && (
                    <div className="animate-fade-in">
                      {product.ingredients ? (
                        <div>
                          <p className="mb-2 font-medium">Ingredients:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            {product.ingredients.map((ingredient, idx) => (
                              <li key={idx}>{ingredient}</li>
                            ))}
                          </ul>
                          
                          {product.allergens && (
                            <div className="mt-4">
                              <p className="mb-2 font-medium">Allergens:</p>
                              <p>{product.allergens.join(', ')}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p>No ingredients information available for this product.</p>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'shipping' && (
                    <div className="space-y-4 animate-fade-in">
                      <p>We take great care in packaging and delivering our products to ensure they arrive in perfect condition.</p>
                      <p><span className="font-medium">Local Delivery:</span> Same-day delivery available for orders placed before noon.</p>
                      <p><span className="font-medium">Shipping:</span> We offer nationwide shipping with special cold packaging for our cakes.</p>
                      <p><span className="font-medium">Pickup:</span> Available at our store during business hours.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Share */}
              <div className="mt-8 flex items-center">
                <span className="text-sm font-medium text-gray-600 mr-3">Share:</span>
                <div className="flex space-x-3">
                  <button className="text-gray-500 hover:text-cake-500 transition-colors" aria-label="Share on Facebook">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-cake-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
