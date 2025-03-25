
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Header } from '@/components/Header';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 pt-24 pb-16 flex flex-col items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Heart className="h-10 w-10 text-gray-400" />
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">
              Your wishlist is empty
            </h1>
            
            <p className="text-gray-500 mb-8">
              You haven't added any products to your wishlist yet.
              Browse our products and find something you love.
            </p>
            
            <Link to="/">
              <Button>
                Discover Products
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
            Your Wishlist ({wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'})
          </h1>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearWishlist}
          >
            Clear Wishlist
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-fade-in"
            >
              <Link to={`/product/${item.id}`} className="block relative pt-[100%] bg-gray-50">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-contain p-6"
                />
              </Link>
              
              <div className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-1 hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500 capitalize">
                    {item.category}
                  </span>
                  
                  <span className="font-semibold">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                  
                  <Button 
                    size="sm"
                    onClick={() => addToCart(item, 1)}
                    className="flex-1"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
