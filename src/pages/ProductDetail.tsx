
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '@/lib/api';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, Plus, Minus, Star, ShoppingCart } from 'lucide-react';
import { WishlistButton } from '@/components/WishlistButton';
import { useCart } from '@/context/CartContext';
import { Header } from '@/components/Header';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      const productData = await fetchProductById(parseInt(id));
      setProduct(productData);
      setIsLoading(false);
    };
    
    loadProduct();
  }, [id]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
          <div className="animate-pulse">
            <Button variant="ghost" className="mb-8">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="aspect-square rounded-xl bg-gray-200" />
              
              <div className="space-y-4">
                <Skeleton className="h-8 w-2/3 bg-gray-200" />
                <Skeleton className="h-6 w-1/3 bg-gray-200" />
                <Skeleton className="h-4 w-1/4 bg-gray-200" />
                <div className="space-y-2 pt-6">
                  <Skeleton className="h-4 w-full bg-gray-200" />
                  <Skeleton className="h-4 w-full bg-gray-200" />
                  <Skeleton className="h-4 w-2/3 bg-gray-200" />
                </div>
                
                <div className="pt-6">
                  <Skeleton className="h-12 w-full bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Product not found
            </h2>
            <p className="text-gray-500 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={handleBack}>
              Go Back
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <Button variant="ghost" onClick={handleBack} className="mb-8 hover:bg-gray-100">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 relative">
            <div className="absolute top-4 right-4 z-10">
              <WishlistButton product={product} size="md" />
            </div>
            
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              </div>
            )}
            
            <img 
              src={product.image} 
              alt={product.title}
              className={`w-full h-auto max-h-[500px] object-contain mx-auto ${
                imageLoaded ? 'animate-fade-in' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="text-sm uppercase tracking-wider text-gray-500">
                {product.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-1">
                {product.title}
              </h1>
              
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating.rate) 
                          ? 'text-yellow-500 fill-yellow-500' 
                          : 'text-gray-300 fill-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {product.rating.rate}
                  </span>
                </div>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-sm text-gray-500">
                  {product.rating.count} reviews
                </span>
              </div>
            </div>
            
            <div className="text-2xl font-bold text-gray-900 mb-4">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="prose prose-sm text-gray-700 mb-6">
              <p>{product.description}</p>
            </div>
            
            <div className="mt-auto pt-6">
              <div className="flex items-center mb-6">
                <span className="mr-4 font-medium">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={increaseQuantity}
                    className="h-10 w-10 rounded-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button 
                className="w-full h-12 text-base"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
