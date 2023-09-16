import React from "react";

const NoteSkeleton = () => {
  return (
    <>
      <div className="card animate-pulse w-80 h-32 lg:h-60 bg-base-100 shadow-md">
        {/* Card Container */}
        <div className="card-body flex flex-col justify-between p-4 lg:p-8">
          {/* Card Title */}
          <div className="h-4 w-1/2 bg-base-300 rounded"></div>
          {/* Card Body */}
          <div className="h-10 lg:h-20 text-sm lg:text-lg overflow-hidden">
            <div className="h-3 bg-base-300 rounded mb-2"></div>
            <div className="h-3 bg-base-300 rounded"></div>
          </div>
          {/* Card Date */}
          <div className="card-actions justify-end">
            <div className="h-2 w-1/2 bg-base-300 rounded"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteSkeleton;
