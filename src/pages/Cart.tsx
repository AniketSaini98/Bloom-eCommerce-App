
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/Header';

export default function Cart() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    totalItems, 
    totalPrice 
  } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 pt-24 pb-16 flex flex-col items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-gray-400" />
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">
              Your cart is empty
            </h1>
            
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything to your cart yet.
              Browse our products and find something you love.
            </p>
            
            <Link to="/">
              <Button>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h1>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-xl p-4 flex gap-4 animate-fade-in"
              >
                <Link to={`/product/${item.id}`} className="shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-24 h-24 object-contain rounded-md bg-gray-50 p-2"
                  />
                </Link>
                
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-medium text-gray-900 hover:text-primary truncate transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500 capitalize">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-end mt-2">
                    <div className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 ml-2 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-xl p-6 h-fit sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg">
                <span className="font-medium">Total</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <Button className="w-full mt-4">
              Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="mt-4 text-center">
              <Link 
                to="/" 
                className="text-sm text-primary hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
