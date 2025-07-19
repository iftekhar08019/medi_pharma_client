import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, view }) => {
  if (!products || products.length === 0)
    return <div className="text-gray-500 text-center py-10">No products available.</div>;

  if (view === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <ProductCard key={i} product={p} view="grid" />
        ))}
      </div>
    );
  }

  // List view
  return (
    <div className="flex flex-col gap-4">
      {products.map((p, i) => (
        <ProductCard key={i} product={p} view="list" />
      ))}
    </div>
  );
};

export default ProductList;
