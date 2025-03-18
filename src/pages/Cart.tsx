
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, CreditCard, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { toast } from "sonner";

const Cart = () => {
  const { items, total, clearCart } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  
  const handleCheckout = () => {
    setCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast.success("Order placed successfully!");
      clearCart();
      setCheckingOut(false);
    }, 1500);
  };
  
  const shipping = items.length > 0 ? 10 : 0;
  const grandTotal = total + shipping;
  
  return (
    <div className="pt-16 min-h-screen">
      <div className="bg-cake-50 py-12 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">Your Cart</h1>
          <p className="text-xl text-gray-600 animate-fade-in animate-delay-100">
            {items.length > 0 
              ? `You have ${items.length} item${items.length !== 1 ? 's' : ''} in your cart`
              : 'Your cart is empty'}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="glass-card animate-fade-in">
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Cart Items</h2>
                  <button 
                    onClick={clearCart}
                    className="text-sm text-gray-500 hover:text-red-500 inline-flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear Cart
                  </button>
                </div>
                
                <div>
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      quantity={item.quantity}
                    />
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link 
                    to="/products" 
                    className="text-cake-600 hover:text-cake-700 inline-flex items-center text-sm font-medium"
                  >
                    <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card animate-fade-in animate-delay-100">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 mt-3"></div>
                  <div className="flex justify-between font-semibold text-gray-800 text-lg">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    onClick={handleCheckout}
                    disabled={checkingOut}
                    className="w-full bg-cake-500 hover:bg-cake-600 disabled:bg-cake-300 text-white py-4 rounded-full flex items-center justify-center transition-colors duration-300 font-medium mb-4"
                  >
                    {checkingOut ? (
                      <>
                        <div className="mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Checkout
                      </>
                    )}
                  </button>
                  
                  <p className="text-sm text-gray-500 text-center">
                    Taxes will be calculated at checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card text-center py-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-cake-100 rounded-full mb-6">
              <ShoppingBag className="h-10 w-10 text-cake-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link 
              to="/products" 
              className="bg-cake-500 hover:bg-cake-600 text-white py-3 px-8 rounded-full inline-flex items-center justify-center transition-all duration-300 text-lg font-medium"
            >
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
