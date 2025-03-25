
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { WishlistButton } from './WishlistButton';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <div 
      className={cn(
        'group bg-white rounded-xl overflow-hidden shadow-sm card-hover',
        'transition-all duration-300 h-full flex flex-col relative',
        className
      )}
    >
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        <div className="relative pt-[100%] bg-gray-50 overflow-hidden">
          <div className="absolute top-3 right-3 z-10">
            <WishlistButton product={product} size="sm" />
          </div>
          
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
            </div>
          )}
          
          <img
            src={product.image}
            alt={product.title}
            className={cn(
              'absolute inset-0 w-full h-full object-contain p-6 image-fade-in',
              imageLoaded ? 'loaded' : ''
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        <div className="flex flex-col p-4 flex-grow">
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">
            {product.category}
          </div>
          
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center mt-auto pt-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-sm font-medium">
                {product.rating.rate}
              </span>
              <span className="ml-1 text-xs text-gray-500">
                ({product.rating.count})
              </span>
            </div>
            
            <div className="ml-auto font-semibold">
              ${product.price.toFixed(2)}
            </div>
          </div>
        </div>
        
        <div className="p-4 pt-0">
          <Button 
            onClick={handleAddToCart}
            className="w-full transition-all"
          >
            Add to Cart
          </Button>
        </div>
      </Link>
    </div>
  );
}
