
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '@/lib/utils';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItem = ({ id, name, price, image, quantity }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  
  const handleIncrement = () => {
    updateQuantity(id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeItem(id);
    }
  };
  
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 animate-fade-in">
      {/* Product Image */}
      <div className="h-20 w-20 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      
      {/* Product Details */}
      <div className="flex-grow">
        <h3 className="font-medium text-gray-800">{name}</h3>
        <p className="text-cake-600 font-medium">${price.toFixed(2)}</p>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center">
        <button
          onClick={handleDecrement}
          className={cn(
            "p-1 rounded-full text-gray-500 hover:text-cake-500 hover:bg-cake-50 transition-colors",
            quantity === 1 ? "hover:text-red-500" : ""
          )}
          aria-label={quantity === 1 ? "Remove item" : "Decrease quantity"}
        >
          {quantity === 1 ? <Trash2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
        </button>
        
        <span className="mx-3 w-6 text-center">{quantity}</span>
        
        <button
          onClick={handleIncrement}
          className="p-1 rounded-full text-gray-500 hover:text-cake-500 hover:bg-cake-50 transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      
      {/* Item Total */}
      <div className="font-medium text-right w-20">
        ${(price * quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
