
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };
  
  return (
    <div 
      className={cn(
        "group glass-card hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden",
        featured ? "col-span-2 md:col-span-1" : ""
      )}
    >
      {/* Best Seller Tag */}
      {product.bestSeller && (
        <div className="absolute top-4 left-4 z-10 bg-cake-600 text-white text-xs px-3 py-1 rounded-full font-medium">
          Best Seller
        </div>
      )}
      
      {/* Image */}
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden rounded-lg aspect-[4/3]">
        <div className={cn(
          "w-full h-full bg-gray-100 flex items-center justify-center absolute inset-0",
          isImageLoaded ? "opacity-0" : "opacity-100"
        )}>
          <div className="w-8 h-8 border-2 border-cake-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-500 blur-up",
            isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
      
      {/* Content */}
      <div className="mt-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg">
              <Link to={`/products/${product.id}`} className="hover:text-cake-600 transition-colors">
                {product.name}
              </Link>
            </h3>
            <p className="text-gray-600 mt-1 text-sm line-clamp-2">{product.description}</p>
          </div>
          <div className="text-lg font-semibold text-cake-700">${product.price.toFixed(2)}</div>
        </div>
        
        {/* Category tag */}
        <div className="mt-3 mb-4">
          <span className="inline-block bg-cake-100 text-cake-800 text-xs px-2.5 py-1 rounded-full capitalize">
            {product.category}
          </span>
        </div>
        
        {/* Action Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-cake-500 hover:bg-cake-600 text-white rounded-full py-2 flex items-center justify-center transition-colors duration-300"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
