import React, { useState, useEffect, useMemo } from "react";

const SidebarFilters = ({ onFiltersChange, products = [] }) => {
  // Filter states
  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });
  const [priceRange, setPriceRange] = useState(100);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Main filter toggle for mobile
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Collapsible states - open by default on desktop/tablet, collapsed on mobile
  const [availabilityOpen, setAvailabilityOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);

  // Calculate available price range from products
  const maxPrice = Math.max(...(products?.map(p => p.price) || [0]));
  const minPrice = Math.min(...(products?.map(p => p.price) || [0]));

  // Dynamically extract categories from products
  const categories = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    // Extract unique categories from products
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    
    // Filter out any null, undefined, or empty categories
    return uniqueCategories.filter(category => category && category.trim() !== '');
  }, [products]);

  // Handle availability filter changes
  const handleAvailabilityChange = (type) => {
    setAvailability(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Handle price range change
  const handlePriceRangeChange = (e) => {
    setPriceRange(parseInt(e.target.value));
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  // Apply filters to products
  const applyFilters = () => {
    if (!products) return [];

    return products.filter(product => {
      // Availability filter logic
      if (availability.inStock && !availability.outOfStock) {
        // Only in-stock selected: show only in-stock items
        if (!product.inStock) return false;
      } else if (availability.outOfStock && !availability.inStock) {
        // Only out-of-stock selected: show only out-of-stock items
        if (product.inStock) return false;
      } else if (!availability.inStock && !availability.outOfStock) {
        // Neither selected: show all items
        // No filtering needed
      } else if (availability.inStock && availability.outOfStock) {
        // Both selected: show all items
        // No filtering needed
      }

      // Price range filter
      if (product.price > priceRange) return false;

      // Category filter
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(product.category)) return false;
      }

      return true;
    });
  };

  // Notify parent component of filter changes
  useEffect(() => {
    const filteredProducts = applyFilters();
    onFiltersChange?.(filteredProducts, {
      availability,
      priceRange,
      selectedCategories,
    });
  }, [availability, priceRange, selectedCategories, products]);

  // Clear all filters
  const clearFilters = () => {
    setAvailability({ inStock: false, outOfStock: false });
    setPriceRange(maxPrice || 100);
    setSelectedCategories([]);
  };

  return (
    <aside className="w-full lg:w-64 bg-[#ceddd1] rounded-2xl shadow p-5 flex-shrink-0">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex justify-between items-center w-full font-semibold text-lg text-[#2e7153] hover:text-[#1a4a3a] transition-colors"
        >
          <span>Filters</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Desktop Filter Header */}
      <div className="hidden lg:flex justify-between items-center mb-6">
        <h2 className="font-semibold text-lg text-[#2e7153]">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-[#2e7153] hover:text-[#1a4a3a] underline"
        >
          Clear All
        </button>
      </div>

      {/* Filter Content - Hidden on mobile when collapsed */}
      <div className={`lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
        {/* Mobile Clear All Button */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={clearFilters}
            className="text-sm text-[#2e7153] hover:text-[#1a4a3a] underline"
          >
            Clear All
          </button>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <button
            onClick={() => setAvailabilityOpen(!availabilityOpen)}
            className="flex justify-between items-center w-full font-medium text-gray-700 mb-2 hover:text-[#2e7153] transition-colors"
          >
            <span>Availability</span>
            <svg
              className={`w-4 h-4 transform transition-transform ${availabilityOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {availabilityOpen && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input 
                  id="in-stock" 
                  type="checkbox" 
                  className="accent-[#2e7153]"
                  checked={availability.inStock}
                  onChange={() => handleAvailabilityChange('inStock')}
                />
                <label htmlFor="in-stock" className="text-gray-700 text-sm">In Stock</label>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  id="out-of-stock" 
                  type="checkbox" 
                  className="accent-[#2e7153]"
                  checked={availability.outOfStock}
                  onChange={() => handleAvailabilityChange('outOfStock')}
                />
                <label htmlFor="out-of-stock" className="text-gray-700 text-sm">Out of Stock</label>
              </div>
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <button
            onClick={() => setPriceOpen(!priceOpen)}
            className="flex justify-between items-center w-full font-medium text-gray-700 mb-2 hover:text-[#2e7153] transition-colors"
          >
            <span>Price Range</span>
            <svg
              className={`w-4 h-4 transform transition-transform ${priceOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {priceOpen && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice || 100}
                  value={priceRange}
                  className="w-full accent-[#2e7153]"
                  onChange={handlePriceRangeChange}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span>{minPrice}€</span>
                <span>{priceRange}€</span>
                <span>{maxPrice || 100}€+</span>
              </div>
            </div>
          )}
        </div>

        {/* Category */}
        <div>
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="flex justify-between items-center w-full font-medium text-gray-700 mb-2 hover:text-[#2e7153] transition-colors"
          >
            <span>Category ({categories.length})</span>
            <svg
              className={`w-4 h-4 transform transition-transform ${categoryOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {categoryOpen && (
            <div className="flex flex-col gap-1">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="accent-[#2e7153]"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    {cat}
                  </label>
                ))
              ) : (
                <div className="text-sm text-gray-500 italic">No categories available</div>
              )}
            </div>
          )}
        </div>

        {/* Active Filters Summary */}
        {(availability.inStock || availability.outOfStock || selectedCategories.length > 0 || priceRange < (maxPrice || 100)) && (
          <div className="mt-6 pt-4 border-t border-gray-300">
            <h4 className="font-medium text-gray-700 mb-2 text-sm">Active Filters:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              {availability.inStock && !availability.outOfStock && <div>• In Stock only</div>}
              {availability.outOfStock && !availability.inStock && <div>• Out of Stock only</div>}
              {availability.inStock && availability.outOfStock && <div>• All items (In Stock + Out of Stock)</div>}
              {selectedCategories.length > 0 && (
                <div>• Categories: {selectedCategories.join(', ')}</div>
              )}
              {priceRange < (maxPrice || 100) && <div>• Max Price: {priceRange}€</div>}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SidebarFilters;
