
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { toast } = useToast();

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error parsing wishlist from localStorage:', error);
        localStorage.removeItem('wishlist');
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlistItems(prev => [...prev, product]);
      toast({
        title: "Added to wishlist",
        description: `${product.title} added to your wishlist`,
      });
    }
  };

  const removeFromWishlist = (productId: number) => {
    const itemToRemove = wishlistItems.find(item => item.id === productId);
    
    if (itemToRemove) {
      setWishlistItems(prev => prev.filter(item => item.id !== productId));
      toast({
        title: "Removed from wishlist",
        description: `${itemToRemove.title} removed from your wishlist`,
      });
    }
  };

  const isInWishlist = (productId: number): boolean => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    });
  };

  const totalItems = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      totalItems,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
