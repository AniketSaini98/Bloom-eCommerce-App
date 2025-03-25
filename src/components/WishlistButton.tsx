
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/types';
import { useWishlist } from '@/context/WishlistContext';

interface WishlistButtonProps {
  product: Product;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function WishlistButton({ 
  product, 
  variant = 'default', 
  size = 'md',
  className 
}: WishlistButtonProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const inWishlist = isInWishlist(product.id);
  
  const handleToggleWishlist = () => {
    setIsAnimating(true);
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    
    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 300);
  };
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };
  
  const variantClasses = {
    default: 'bg-white shadow-md hover:shadow-lg',
    outline: 'bg-transparent border border-gray-200 hover:bg-gray-50',
    ghost: 'bg-transparent hover:bg-gray-100'
  };
  
  return (
    <button
      type="button"
      onClick={handleToggleWishlist}
      className={cn(
        'rounded-full flex items-center justify-center transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart 
        className={cn(
          'transition-all duration-200',
          inWishlist ? 'fill-red-500 text-red-500' : 'fill-transparent text-gray-600',
          isAnimating && 'animate-pulse-once'
        )} 
        size={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
      />
    </button>
  );
}
