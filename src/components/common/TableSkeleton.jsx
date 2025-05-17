import React from 'react';
import { Skeleton } from 'primereact/skeleton';

const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="w-full animate-pulse">
      {/* Header skeleton */}
      <div className="flex gap-2 mb-4 bg-blue-50 p-2 rounded-t-lg">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton 
            key={`header-${index}`} 
            className="h-8 flex-1 bg-blue-100" 
            shape="rectangle"
          />
        ))}
      </div>

      {/* Rows skeleton */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div 
          key={`row-${rowIndex}`} 
          className={`flex gap-2 p-2 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton 
              key={`cell-${rowIndex}-${colIndex}`} 
              className="h-12 flex-1 bg-blue-100" 
              shape="rectangle"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton; 