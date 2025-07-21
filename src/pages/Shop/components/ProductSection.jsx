import React, { useState } from "react";

import ResultsBar from "./ResultBar";
import SortDropdown from "./SortDropdown";
import ViewToggle from "./ViewToggle";
import ProductList from "./ProductList";
import ProductDetailsModal from "./ProductDetailsModal";

const ProductSection = ({ products, isLoading, isError, error }) => {
  // State for sorting and grid/list view
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("featured");
  
  // Modal state
  const [modalProduct, setModalProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Apply sorting to filtered products
  let sortedProducts = products || [];

  // Sorting logic
  if (sort === "price-low-high") {
    sortedProducts = [...sortedProducts].sort((a, b) => a.price - b.price);
  }
  if (sort === "price-high-low") {
    sortedProducts = [...sortedProducts].sort((a, b) => b.price - a.price);
  }
  if (sort === "name-a-z") {
    sortedProducts = [...sortedProducts].sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sort === "name-z-a") {
    sortedProducts = [...sortedProducts].sort((a, b) => b.name.localeCompare(a.name));
  }

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to first page when products change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of product section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modal handlers
  const handleViewDetails = (product) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalProduct(null);
  };
  const handleAddToCart = (product) => {
    // TODO: Implement add to cart logic
    alert(`Added to cart: ${product.name} (x${product.quantity})`);
    handleCloseModal();
  };
  const handleBuyNow = (product) => {
    // TODO: Implement buy now logic
    alert(`Buy now: ${product.name} (x${product.quantity})`);
    handleCloseModal();
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      if (currentPage <= 3) {
        // Near start
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div className="text-red-500">Error: {error?.message}</div>;

  return (
    <>
      <ProductDetailsModal
        product={modalProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
      <div className="w-full border-1 border-[#396961] rounded-2xl px-3 sm:px-4 py-4 sm:py-8 mb-8">
        {/* Mobile Layout - Stacked */}
        <div className="flex flex-col gap-3 sm:hidden ">
          <div className="flex items-center justify-between">
            <ResultsBar 
              count={currentProducts.length} 
              startIndex={startIndex}
              endIndex={endIndex}
              totalCount={sortedProducts.length}
            />
            <ViewToggle view={view} setView={setView} />
          </div>
          <div className="w-full">
            <SortDropdown sort={sort} setSort={setSort} />
          </div>
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden sm:flex items-center justify-between gap-3">
          <ResultsBar 
            count={currentProducts.length} 
            startIndex={startIndex}
            endIndex={endIndex}
            totalCount={sortedProducts.length}
          />
          <div className="flex items-center gap-4">
            <ViewToggle view={view} setView={setView} />
            <SortDropdown sort={sort} setSort={setSort} />
          </div>
        </div>
      </div>
      
      <ProductList products={currentProducts} view={view} onViewDetails={handleViewDetails} />
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {/* Page numbers */}
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                disabled={typeof page !== 'number'}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  page === currentPage
                    ? 'bg-[#2e7153] text-white'
                    : typeof page === 'number'
                    ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    : 'text-gray-400 cursor-default'
                }`}
              >
                {page}
              </button>
            ))}
            
            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
      
      {/* Page info */}
      {totalPages > 1 && (
        <div className="mt-4 text-center text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} products
        </div>
      )}
    </>
  );
};

export default ProductSection;
