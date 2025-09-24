import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 animate-pulse">
      {/* Skeleton Header */}
      <div className="py-4 flex items-center justify-between border-b border-white-text/10">
        <div className="h-6 w-32 bg-gray-secondry rounded-md"></div>
        <div className="h-8 w-24 bg-purple-primary/50 rounded-md"></div>
      </div>

      {/* Skeleton Filter Bar */}
      <div className="my-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-20 bg-gray-secondry rounded-md"></div>
          <div className="h-8 w-24 bg-gray-secondry rounded-md"></div>
          <div className="h-8 w-24 bg-gray-secondry rounded-md"></div>
        </div>
        <div className="h-8 w-20 bg-gray-secondry rounded-md"></div>
      </div>

      {/* Skeleton Task Columns */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-5 w-1/2 bg-gray-secondry rounded-md"></div>
            <div className="space-y-2">
              <div className="h-16 w-full bg-gray-secondry rounded-lg"></div>
              <div className="h-16 w-full bg-gray-secondry rounded-lg"></div>
              <div className="h-16 w-full bg-gray-secondry rounded-lg opacity-70"></div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default SkeletonLoader;
