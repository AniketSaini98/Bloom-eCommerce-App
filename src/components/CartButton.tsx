
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CartButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CartButton({ variant = 'outline', size = 'md', className }: CartButtonProps) {
  const { totalItems } = useCart();
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };
  
  return (
    <Link to="/cart">
      <Button
        variant={variant}
        size="icon"
        className={cn(
          'relative rounded-full', 
          sizeClasses[size],
          className
        )}
        aria-label={`View cart with ${totalItems} items`}
      >
        <ShoppingBag size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />
        {totalItems > 0 && (
          <span className={cn(
            'absolute flex items-center justify-center -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white font-medium animate-fade-in',
          )}>
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </Button>
    </Link>
  );
}
