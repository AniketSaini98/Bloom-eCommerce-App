
import { useState, useEffect } from 'react';
import { fetchProducts } from '@/lib/api';
import { Product, FilterOptions } from '@/lib/types';
import { ProductGrid } from '@/components/ProductGrid';
import { SearchFilter } from '@/components/SearchFilter';
import { Header } from '@/components/Header';

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: 'all',
    sort: 'newest',
    priceRange: [0, 1000]
  });
  
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
      setIsLoading(false);
    };
    
    loadProducts();
  }, []);
  
  useEffect(() => {
    let result = [...products];
    
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (product) => 
          product.title.toLowerCase().includes(searchLower) || 
          product.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by category
    if (filters.category && filters.category !== 'all') {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }
    
    // Filter by price range
    result = result.filter(
      (product) => 
        product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1]
    );
    
    // Sort products
    switch (filters.sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'newest':
      default:
        // Assuming id represents newness (higher id = newer)
        result.sort((a, b) => b.id - a.id);
    }
    
    setFilteredProducts(result);
  }, [products, filters]);
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <section className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-1">Discover Products</h1>
          <p className="text-gray-500">Find the perfect items for your lifestyle</p>
        </section>
        
        <section className="mb-8">
          <SearchFilter 
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />
        </section>
        
        <section>
          {filters.category !== 'all' && (
            <div className="mb-6">
              <h2 className="text-xl font-medium text-gray-900 capitalize">
                {filters.category}
              </h2>
            </div>
          )}
          
          <ProductGrid 
            products={filteredProducts} 
            isLoading={isLoading} 
          />
        </section>
      </main>
    </div>
  );
}
