import React from "react";

const Skeleton = () => {
  return (
    <div className="border p-4 rounded shadow-2xl w-[80%] max-w-[500px]">
      <div className="relative h-60 mb-4 flex justify-center items-center bg-gray-300 animate-pulse">
        
      </div>
      <div className="h-4 bg-gray-300 rounded-full mb-4"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
    </div>
  );
};

export default Skeleton;
