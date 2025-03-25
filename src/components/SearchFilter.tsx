
import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { FilterOptions, SortOption } from '@/lib/types';
import { fetchCategories } from '@/lib/api';

interface SearchFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters: FilterOptions;
}

export function SearchFilter({ onFilterChange, initialFilters }: SearchFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(initialFilters.search);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    const loadCategories = async () => {
      const categories = await fetchCategories();
      setCategories(['all', ...categories]);
    };
    
    loadCategories();
  }, []);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, search });
  };
  
  const handleClearSearch = () => {
    setSearch('');
    onFilterChange({ ...filters, search: '' });
  };
  
  const handleFilterApply = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };
  
  const handleFilterReset = () => {
    const resetFilters: FilterOptions = {
      search: '',
      category: 'all',
      sort: 'newest',
      priceRange: [0, 1000]
    };
    
    setFilters(resetFilters);
    setSearch('');
    onFilterChange(resetFilters);
    setIsOpen(false);
  };
  
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-2">
        <form onSubmit={handleSearchSubmit} className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="pl-10 pr-10 py-6 shadow-sm"
          />
          {search && (
            <button 
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </form>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
              <SlidersHorizontal size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filters & Sorting</DialogTitle>
            </DialogHeader>
            
            <div className="py-4 space-y-6">
              <div className="space-y-2">
                <Label>Category</Label>
                <div className="flex flex-wrap gap-2 pt-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilters({ ...filters, category })}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        filters.category === category
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } transition-colors`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Price Range</Label>
                <Slider
                  defaultValue={filters.priceRange}
                  min={0}
                  max={1000}
                  step={10}
                  onValueChange={(value) => 
                    setFilters({ ...filters, priceRange: [value[0], value[1]] })
                  }
                  className="py-4"
                />
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    ${filters.priceRange[0]}
                  </span>
                  <span className="text-sm text-gray-500">
                    ${filters.priceRange[1]}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Sort by</Label>
                <RadioGroup
                  defaultValue={filters.sort}
                  onValueChange={(value) => 
                    setFilters({ ...filters, sort: value as SortOption })
                  }
                  className="pt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="newest" id="sort-newest" />
                    <Label htmlFor="sort-newest" className="cursor-pointer">Newest</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-low" id="sort-price-low" />
                    <Label htmlFor="sort-price-low" className="cursor-pointer">Price: Low to High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-high" id="sort-price-high" />
                    <Label htmlFor="sort-price-high" className="cursor-pointer">Price: High to Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rating" id="sort-rating" />
                    <Label htmlFor="sort-rating" className="cursor-pointer">Top Rated</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="flex justify-between gap-2">
              <Button variant="outline" onClick={handleFilterReset} className="flex-1">
                Reset
              </Button>
              <Button onClick={handleFilterApply} className="flex-1">
                Apply Filters
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
