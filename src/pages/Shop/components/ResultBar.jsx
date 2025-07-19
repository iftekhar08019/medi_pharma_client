import React from "react";

const ResultsBar = ({ count, startIndex, endIndex, totalCount }) => {
  if (count === 0) {
    return <div className="text-sm sm:text-lg font-medium text-gray-700">No products found</div>;
  }

  // If pagination props are provided, show range
  if (startIndex !== undefined && endIndex !== undefined && totalCount !== undefined) {
    return (
      <div className="text-sm sm:text-lg font-medium text-gray-700">
        Showing {startIndex + 1}-{Math.min(endIndex, totalCount)} of {totalCount} result{totalCount > 1 ? "s" : ""}
      </div>
    );
  }

  // Fallback to original format
  return (
    <div className="text-sm sm:text-lg font-medium text-gray-700">
      Showing {count} result{count > 1 ? "s" : ""}
    </div>
  );
};

export default ResultsBar;
