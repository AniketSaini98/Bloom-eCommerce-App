
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CartButton } from './CartButton';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { totalItems: wishlistItems } = useWishlist();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Wishlist', href: '/wishlist', icon: Heart, count: wishlistItems },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header 
      className={cn(
        'fixed top-0 inset-x-0 z-40 transition-all duration-300 backdrop-blur',
        isScrolled 
          ? 'bg-white/90 border-b border-gray-200/50 shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0">
              <div className="p-6 border-b">
                <div className="font-semibold text-xl">Bloom</div>
              </div>
              <nav className="px-2 py-4">
                {navigation.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.href}
                    className={cn(
                      'flex items-center px-4 py-3 mb-1 rounded-lg relative',
                      isActive(item.href)
                        ? 'bg-gray-100 text-primary font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                    {item.count > 0 && (
                      <span className="ml-auto bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="text-xl font-semibold text-gray-900">
            Bloom
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium relative',
                isActive(item.href)
                  ? 'text-primary'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              {item.name}
              {item.count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                  {item.count}
                </span>
              )}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <CartButton />
        </div>
      </div>
    </header>
  );
}
