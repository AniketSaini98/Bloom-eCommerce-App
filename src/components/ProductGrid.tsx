
import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-gray-100 rounded-xl h-[340px]"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 w-full">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500 text-center max-w-md">
          We couldn't find any products matching your search criteria. Please try a different search or browse all products.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
